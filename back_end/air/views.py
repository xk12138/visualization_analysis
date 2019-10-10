from django.shortcuts import render
from django.http import HttpResponse
import pymysql
import json
import logging

db_host = 'localhost'
db_user = 'root'
db_pass = 'root'
db_database = 'innovation'

# Create your views here.
def get_quality(request):
    if request.method == 'GET':
        if 'year' in request.GET and 'month' in request.GET and 'day' in request.GET and 'city' in request.GET:
            year = request.GET.get('year')
            month = request.GET.get('month')
            day = request.GET.get('day')
            from_city = request.GET.get('city')

            cmd = 'select * from air where year={} and month={} and day={} and from_city="{}"'.format(year, month, day, from_city)

            try:
                connect = pymysql.connect(host=db_host, user=db_user, password=db_pass, database=db_database)
                cursor = connect.cursor()
                
                cursor.execute(cmd)
                results = cursor.fetchall()
                print(results[0])
                qualitys = []
                for i in results:
                    quality = {
                        'hour': i[5],
                        'DEWP': i[6],
                        'HUMI': i[7],
                        'PRES': i[8],
                        'TEMP': i[9],
                        'CBWD': i[10],
                        'LWS': i[11],
                        'PREC': i[12],
                        'LPREC': i[13],
                        'PM': i[14]
                    }
                    qualitys.append(quality)
                
                return HttpResponse(json.dumps(qualitys))
            except Exception as e:
                print("Error: " + str(e))

    return HttpResponse("服务器发生错误！")
    logger = logging.getLogger(__name__)
    logger.info("loggers")

