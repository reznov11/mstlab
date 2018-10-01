#!-*- coding: utf-8 -*-

import random
from faker import Faker
from . import api_route
from flask import render_template, redirect, url_for, flash, session, jsonify

# Initiate the extension with Russian Localization
fake = Faker('ru_RU')

@api_route.route('/')
def main():
	return render_template('main/index.html')

@api_route.route('/api/users', methods=['GET'])
def api():
	# Main users menu
	users = []

	# Second user menu
	user_branches = []

	# Third user menu
	user_extra_branches = []

	# Generate random users for first menu setup
	for _ in range(5):
		dict_obj = {}
		dict_obj['title'] = fake.sentence()[0:20]
		dict_obj['id'] = _
		dict_obj['name'] = fake.name()[0:10]
		dict_obj['city'] = fake.city()[0:10]
		users.append(dict_obj)

	# Generate random user branches for second menu setup
	for _ in range(random.randint(1,10)):
		dict_obj = {}
		dict_obj['title'] = fake.sentence()[0:20]
		dict_obj['id'] = _
		dict_obj['name'] = fake.name()[0:10]
		user_branches.append(dict_obj)
	
	# Generate random user branches for third menu setup
	for _ in range(random.randint(1,6)):
		dict_obj = {}
		dict_obj['title'] = fake.sentence()[0:20]
		dict_obj['id'] = _
		dict_obj['name'] = fake.name()[0:10]
		user_extra_branches.append(dict_obj)
	
	# Return json object contains all the users branches
	return jsonify({
		"users":users,
		"user_branches":user_branches,
		"user_extra":user_extra_branches
	})