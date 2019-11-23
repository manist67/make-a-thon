import requests
import time

DOMAIN = "http://vending.hssoft.kr:3000"

if __name__ == "__main__":
    while True:
        time.sleep(1)
        # check the user input
        id = None
        while True:
            time.sleep(1)
            r = None
            try:
                r = requests.get(DOMAIN)
            except:
                continue

            if r.status_code == 200:
                data = r.json()
                id = data.get("id")
                break

        # TODO: indicater on


        # check the fingerprint input
        photoPath = None
        while not photoPath:
            time.sleep(1)
            # read photo
            photoPath = "./main.py"


        # check the fingerprint
        while True:
            time.sleep(1)
            r = None
            with open(photoPath, "rb") as image_file:
                try:
                    r = requests.post(DOMAIN + "/fingers", files={ "file": image_file })
                except Exception as e:
                    print(e)
                    continue

            if r.status_code == 200:
                pass

            time.sleep(1)
        
        #TODO: indicater off

