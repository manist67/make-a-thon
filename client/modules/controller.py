# 유저가 앞에 존재하는지 확인하는 함수이다.
# 조도 센서를 이용하여 가시광선이 센서에 안에 들어오면 false를 보낸다.
# 만약 사용자의 손이 조도센서를 가지면 true를 보내준다.
# return True | False
def isUserOn():
	pass


# 카메라의 사진을 가져오는 함수이다.
# 유저가 있는지 없는지 여부는 중요하지 않으며 그저 카메라로 사진을 찍은 후
# 해당 이미지의 위치를 return해주는 함수이다.
# return PathLikeString
# throws 
def getPicturePath():
	pass

# 자판기의 버튼의 led의 불빛을 제어하는 함수이다.
# params ( list ) btns
# btns는 { color: String }들로 이루어진 리스트이다
# color는 #rrggbb형태로 오며 해당 rgb값을 순서대로 led에 출력한다
def setBtnLedLight(btns):
	pass


# 자판기의 버튼에 함수를 연결하는 함수이다.
# params ( function ) func 
# func는 (idx: Int)를 받는 함수이며 버튼이 누렸을 시에 func를 호출하면 된다.
# idx는 버튼에 대한 번호이다
# 0부터 시작한다.
def setBtnFunc(func):
	pass


# 모터가 끝까지 돌아가면 던지는 에러이다.
class MaximumMoterException(Exception):
	pass

# 모터를 돌려준다.
# idx는 버튼에 대한 번호이다
# 0부터 시작한다.
def moveMoter(idx):
	raise MaximumMoterException()


# 버튼 개수를 받는 함수이다.
# return length: Integer이며
# 연결한 버튼의 개수를 리턴해준다.
def getBtnCount():