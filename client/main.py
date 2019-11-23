import os, sys
currDir = os.path.dirname(os.path.realpath(__file__))
rootDir = os.path.abspath(os.path.join(currDir, '..'))
if rootDir not in sys.path: # add parent dir to paths
	sys.path.append(rootDir)

import modules.controller as ct
from time import sleep

IDLE = "IDLE"
WAIT_AUTH = "WAIT_AUTH"
WAIT_SELECT = "WAIT_SELECT"
WAIT_OUTPUT = "WAIT_OUTPUT"
AUTH_FAIL = "AUTH_FAIL"
CASH_FAIL = "CASH_FAIL"

class Vending:
	def __init__(self):
		self.status = IDLE
		self.btns = [ {"idx": idx, "color": "#000000"} for idx in range(0, ct.getBtnCount()) ]
		ct.setBtnFunc(self.btn_handler)
	
	def btn_handler(self, idx):
		print("idx btn run")
		if self.status is not WAIT_SELECT: return
		self.status = WAIT_OUTPUT
		# TODO: check user cash
		
		if False: # TODO: if server denied to purchase
			self.status = CASH_FAIL
		
		# TODO: if success
		

	def run_IDLE(self):
		if self.status is not IDLE: return
		self.btns = [ {"idx": idx, "color": "#000000"} for idx in range(0, ct.getBtnCount()) ]
		ct.setBtnLedLight(self.btns)

		if ct.isUserOn():
			self.status = WAIT_AUTH
		

	def run_wait_auth(self):
		if self.status is not WAIT_AUTH: return
		path = ct.getPicturePath()
		# TODO: request to server set the auth infomation
		# TODO: create thread to remove the auth infomation when after 20 seconds

	def run_auth_fail(self):
		if self.status is not AUTH_FAIL: return
		self.status = IDLE

	
	def run(self):
		if self.status is IDLE:
			self.run_IDLE()

		elif self.status is WAIT_AUTH:
			self.run_wait_auth()

		elif self.status is AUTH_FAIL:
			self.run_auth_fail()
		
		sleep(0.5)




if __name__ == "__main__":
	vending_merchine = Vending()
	while True:
		vending_merchine.run()
