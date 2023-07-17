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

        # 원소에 대한 정보를 리스트에 추가합니다.
        data.append({
            'id': "대전광역시 유성구 " + dong + " " + str(num),
            'priceType': price.split(" ")[0],
            'priceFirst': price.split(" ")[1].split("/")[0],
            'priceMonth': priceMonth,
            'description':description,
            'floor':room_details.split(",")[0],
            'area': room_details.split(",")[1].strip().split("m")[0],
            'fee': room_details.split(",")[2].split("관리비")[1].strip().split("만")[0],
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
  print(df)
  return df

def dongScroll(url, dong):
  global num
  data = pd.DataFrame()
  options = webdriver.ChromeOptions()
  options.add_argument("headless")
  options.add_argument('window-size=1920x1080') 
  driver = webdriver.Chrome()
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
      data.to_csv(f'./DB/대전광역시 유성구 {dong}.csv')
      data = pd.DataFrame()
      num = 0
      break
  driver.quit()

map = {
  "궁동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B1%2C2%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.3101497%2C36.343482%5D%2C%5B127.3817325%2C36.3794238%5D%5D%2C%22center%22%3A%5B127.34594105568203%2C36.361454959585075%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200122%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EA%B6%81%EB%8F%99%22%7D&tab=all",
  "어은동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B1%2C2%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.321269%2C36.3526246%5D%2C%5B127.3928517%2C36.3885622%5D%5D%2C%22center%22%3A%5B127.35706034982555%2C36.37059550529574%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200123%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EC%96%B4%EC%9D%80%EB%8F%99%22%7D&tab=all",
  "죽동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B1%2C2%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.2960656%2C36.3575483%5D%2C%5B127.3676484%2C36.3934836%5D%5D%2C%22center%22%3A%5B127.33185695548053%2C36.37551805204873%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200121%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EC%A3%BD%EB%8F%99%22%7D&tab=all",
  "봉명동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B1%2C2%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.3108397%2C36.3353951%5D%2C%5B127.3824225%2C36.3713407%5D%5D%2C%22center%22%3A%5B127.34663114396699%2C36.353369972431786%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200111%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EB%B4%89%EB%AA%85%EB%8F%99%22%7D&tab=all",
  "전민동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B2%2C1%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.3353851%2C36.3759583%5D%2C%5B127.4618995%2C36.4312235%5D%5D%2C%22center%22%3A%5B127.39864231888181%2C36.40359581872363%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200141%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EC%A0%84%EB%AF%BC%EB%8F%99%22%7D&tab=all",
  "장대동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B2%2C1%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.2680187%2C36.3347208%5D%2C%5B127.3945331%2C36.3900152%5D%5D%2C%22center%22%3A%5B127.33127589739762%2C36.36237292719996%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200117%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EC%9E%A5%EB%8C%80%EB%8F%99%22%7D&tab=all",
  "관평동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B2%2C1%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.3262334%2C36.3946102%5D%2C%5B127.4527479%2C36.449862%5D%5D%2C%22center%22%3A%5B127.38949065407644%2C36.422240995810384%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200146%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EA%B4%80%ED%8F%89%EB%8F%99%22%7D&tab=all",
  "신성동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B2%2C1%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.2862494%2C36.3562061%5D%2C%5B127.4127638%2C36.4114853%5D%5D%2C%22center%22%3A%5B127.34950659474806%2C36.38385063118928%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200125%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EC%8B%A0%EC%84%B1%EB%8F%99%22%7D&tab=all",
  "구암동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B2%2C1%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.2596262%2C36.3259034%5D%2C%5B127.3861406%2C36.3812041%5D%5D%2C%22center%22%3A%5B127.32288342854895%2C36.3535586304312%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200112%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EA%B5%AC%EC%95%94%EB%8F%99%22%7D&tab=all",
  "원신흥동":"https://www.dabangapp.com/search/map?filters=%7B%22multi_room_type%22%3A%5B2%2C1%5D%2C%22selling_type%22%3A%5B0%2C1%5D%2C%22deposit_range%22%3A%5B0%2C999999%5D%2C%22price_range%22%3A%5B0%2C999999%5D%2C%22trade_range%22%3A%5B0%2C999999%5D%2C%22maintenance_cost_range%22%3A%5B0%2C999999%5D%2C%22room_size%22%3A%5B0%2C999999%5D%2C%22supply_space_range%22%3A%5B0%2C999999%5D%2C%22room_floor_multi%22%3A%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C-1%2C0%5D%2C%22division%22%3Afalse%2C%22duplex%22%3Afalse%2C%22room_type%22%3A%5B1%2C2%5D%2C%22use_approval_date_range%22%3A%5B0%2C999999%5D%2C%22parking_average_range%22%3A%5B0%2C999999%5D%2C%22household_num_range%22%3A%5B0%2C999999%5D%2C%22parking%22%3Afalse%2C%22short_lease%22%3Afalse%2C%22full_option%22%3Afalse%2C%22elevator%22%3Afalse%2C%22balcony%22%3Afalse%2C%22safety%22%3Afalse%2C%22pano%22%3Afalse%2C%22is_contract%22%3Afalse%2C%22deal_type%22%3A%5B0%2C1%5D%7D&position=%7B%22location%22%3A%5B%5B127.2797851%2C36.311915%5D%2C%5B127.4062995%2C36.3672256%5D%5D%2C%22center%22%3A%5B127.343042323576%2C36.33957521067352%5D%2C%22zoom%22%3A14%7D&search=%7B%22id%22%3A%22region_30200114%22%2C%22type%22%3A%22region%22%2C%22name%22%3A%22%EC%9B%90%EC%8B%A0%ED%9D%A5%EB%8F%99%22%7D&tab=all",
  "세동":"ㅇㅇ",
  "도룡동":"dd",
  "장동":"dd",
  "대동":"dd",
  "방동":"dd",
  "신동":"dd",
  "원내동":"ㅇㅇ",
  "하기동":"dd",
  "탑립동":"dd",
  "둔곡동":"dd",
  "구룡동":"dd",
  "금고동":"dd",
  "송강동":"dd",
  "지족동":"dd",
  "용산동":"dd",
  "원촌동":"dd",
  "방현동":"dd",
  "노은동":"dd",
  "문지동":"dd",
  "반석동":"dd",
  "상대동":"dd",
  "대정동":"dd",
  "가정동":"dd",
  "자운동":"dd",
  "신봉동":"dd",
  "안산동":"dd",
  "봉산동":"dd",
  "복용동":"dd",
  "계산동":"dd",
  "교촌동":"dd",
  "용계동":"dd",
  "추목동":"dd",
  "덕명동":"dd",
  "학하동":"dd",
  "구성동":"dd",
  "덕진동":"dd",
  "화암동":"dd",
  "외삼동":"dd",
  "송정동":"dd"
}
for (dong, url) in map.items():
  dongScroll(url, dong)