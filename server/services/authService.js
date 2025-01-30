{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww29200\viewh17820\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import axios from 'axios';\
import ApiService from './apiService';\
\
class AuthService extends ApiService \{\
  constructor() \{\
    super('/auth');\
  \}\
\
  async register(userData) \{\
    try \{\
      const response = await this.axiosInstance.post('/register', userData);\
      return response.data;\
    \} catch (error) \{\
      throw new Error(error.response?.data?.message || 'Registration failed');\
    \}\
  \}\
\
  async login(email, password) \{\
    try \{\
      const response = await this.axiosInstance.post('/login', \{ email, password \});\
      return response.data;\
    \} catch (error) \{\
      throw new Error(error.response?.data?.message || 'Login failed');\
    \}\
  \}\
\
  // Add other methods like forgotPassword, resetPassword, etc.\
\}\
\
export default new AuthService();}