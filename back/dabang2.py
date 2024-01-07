from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import json
import requests
import pandas as pd
import time
import os

def geocoding(address):
  api_key = "65fcfd0ba2283e69daf84cbd73c74b57"
  url = 'https://dapi.kakao.com/v2/local/search/address.json?query={address}'.format(address=address)
  headers = {"Authorization": "KakaoAK " + api_key}
  result = json.loads(str(requests.get(url, headers=headers).text))
  match_first = result['documents'][0]['address']
  return float(match_first['y']), float(match_first['x'])

num = 0
def pageScroll(driver, dong):
  global num
  original_window = driver.current_window_handle
  data = []

  # 전체 웹 요소를 가져옵니다.
  elements = driver.find_elements(By.CSS_SELECTOR, 'li.styled__CardItem-sc-5dgg47-3.khUcwX')

  # 각 원소에 대해 반복합니다.
  for element in elements:
      try:
        # 웹 요소가 다시 DOM에 나타날 때까지 기다립니다.
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'img')))

        # 원소의 이미지 URL, 비용 정보, 방 종류 정보, 방의 자세한 정보, 소개글을 스크랩합니다.
        image_url = element.find_element(By.CSS_SELECTOR, 'img').get_attribute('src')
        price = element.find_element(By.CSS_SELECTOR, 'h1.styled__Price-sc-1fwit0q-8.hVZelB').text
        room_type = element.find_element(By.CSS_SELECTOR, 'p.styled__RoomType-sc-1fwit0q-9.etdxaS').text
        room_details = element.find_element(By.CSS_SELECTOR, 'p.styled__Desc-sc-1fwit0q-10.jHuUZw').text

        # 원소의 이미지를 클릭하여 이동합니다.
        img_element = element.find_element(By.CSS_SELECTOR, 'img')
        driver.execute_script("arguments[0].click();", img_element)

        # 모든 창을 대상으로 반복합니다.
        for window_handle in driver.window_handles:
            # 원래 창이 아닌 창을 찾습니다.
            if window_handle != original_window:
                # 창을 변경합니다.
                driver.switch_to.window(window_handle)
                break

        # 페이지가 로드되는 동안 잠시 기다립니다.
        time.sleep(2)

        # 이동한 페이지의 URL을 저장합니다.
        new_url = driver.current_url
        description = element = driver.find_element(By.CSS_SELECTOR, 'p.title').text
        address = driver.find_element(By.CSS_SELECTOR, 'div.styled__NewAddress-sc-8pfhii-4.diajmd p').text

        coord = geocoding(address)
        latitude = coord[0]
        longitude = coord[1]

        driver.close()  
        
        # 원래 페이지로 돌아옵니다.
        driver.switch_to.window(original_window)

        # 페이지가 로드되는 동안 잠시 기다립니다.
        time.sleep(2)

        num += 1
        
        if len(price.split(" ")[1].split("/")) >1:
           priceMonth = price.split(" ")[1].split("/")[1]
        else:
           priceMonth = 0

        if room_type == "투룸":
          roomNum = 2
        else:
          roomNum = 3

        fee = room_details.split(",")[2].split("관리비")[1].strip().split("만")[0]
        
        if fee == "없음":
          fee = 0
        
        # 원소에 대한 정보를 리스트에 추가합니다.
        data.append({
            'id': "대전광역시 " + str(num),
            'priceType': price.split(" ")[0],
            'priceFirst': "".join(price.split(" ")[1].split("/")[0].split('억')),
            'priceMonth': priceMonth,
            'description':description,
            'floor':room_details.split(",")[0],
            'area': room_details.split(",")[1].strip().split("m")[0],
            'fee': fee,
            'roomType': room_type.split(" · ")[0],
            'roomNum': roomNum,
            'address':address,
            'latitude': latitude,
            'longitude': longitude,
            'detailUrl': new_url,
            'imageUrl': image_url,
            'roomList': "[]"
        })
        print(data[-1])
      except:
         print("err")
  df = pd.DataFrame(data)
  df = df.set_index("id")
  df.to_csv(f'./DB/대전광역시_{num}.csv')
  print(df)
  return df

def dongScroll(url, dong):
  global num
  data = pd.DataFrame()
  options = webdriver.ChromeOptions()
  # options.add_argument("headless")
  options.add_argument('window-size=1920x1080') 
  driver = webdriver.Chrome(options)
  driver.get(url)

  # search_box = driver.find_element(By.CSS_SELECTOR, 'input.styled__Input-fbln58-2.elHbPO')
  # search_box.send_keys(dong)
  # time.sleep(3)
  # driver.execute_script("arguments[0].dispatchEvent(new KeyboardEvent('keydown', {'key':'Enter'}));", search_box)
  # time.sleep(1)
  while(1):
    data = pd.concat([data, pageScroll(driver, dong)])
    try:
      next_button = driver.find_element(By.CSS_SELECTOR, 'button[data-testid="next-btn"]')
      driver.execute_script("arguments[0].click();", next_button)
      time.sleep(3)
    except Exception as e:
      print("No more pages.")
      print(data)
      data.to_csv(f'./DB/대전광역시.csv')
      data = pd.DataFrame()
      num = 0
      break
  driver.quit()

map = {
  "대전광역시":"https://dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B1%2C2%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.2958543%2C36.2672587%5D%2C%5B127.5979783%2C36.419908%5D%5D%2C%22center%22%3A%5B127.4469163%2C36.3436208%5D%2C%22zoom%22%3A12%7D&search=%7B%22id%22%3A%22%22%2C%22type%22%3A%22%22%2C%22name%22%3A%22%22%7D&tab=all",
}
for (dong, url) in map.items():
  dongScroll(url, dong)