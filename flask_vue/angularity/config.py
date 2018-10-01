# -*- coding: utf-8 -*-

import os

class Config(object):
	# JSON configurations for API purposes
	JSON_AS_ASCII = False
	JSON_SORT_KEYS = False

class ProdConfig(Config):
	DEBUG = False

class DevConfig(Config):
	DEBUG = True
	APP_NAME = 'angularity'