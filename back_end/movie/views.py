from django.shortcuts import render
from django.http import HttpResponse
import pymysql
from datetime import datetime
import json

db_host = 'localhost'
db_user = 'root'
db_pass = 'root'
db_database = 'innovation'

# Create your views here.
def test(request):
    return HttpResponse('Hello world.')

def get_movies(request):
    if request.method == 'GET':
        if 'index' in request.GET:
            try:
                index = int(request.GET.get('index'))
                # 获取所有的电影列表
                connect = pymysql.connect(host=db_host, user=db_user, password=db_pass, database=db_database)
                cursor = connect.cursor()

                cmd = 'select * from movie limit {}, {}'.format(index * 20, index + 19)
                cursor.execute(cmd)
                results = cursor.fetchall()
                movies = []
                for result in results:
                    try:
                        movie = {
                            'id': result[0],
                            'rate': result[1],
                            'title': result[2],
                            'url': result[3],
                            'cover': result[4],
                            'type': result[5],
                            'time': result[6].strftime('%Y-%m-%d'),
                            'main_actor': result[7],
                            'director': result[8],
                            'star5': result[9],
                            'star4': result[10],
                            'star3': result[11],
                            'star2': result[12],
                            'star1': result[13]
                        }
                        if len(movie['main_actor']) > 12:
                            movie['main_actor'] = movie['main_actor'][:12] + '...'
                        movies.append(movie)
                    except Exception as e:
                        print("Error: " + str(e))
                return HttpResponse(json.dumps(movies))
            except Exception as e:
                print("Error: " + str(e))
    return HttpResponse('服务器发生错误！')


def get_detail(request):
    if request.method == 'GET':
        if 'id' in request.GET:
            try:
                m_id = int(request.GET.get('id'))

                connect = pymysql.connect(host=db_host, user=db_user, password=db_pass, database=db_database)
                cursor = connect.cursor()

                cmd = 'select * from movie where id={}'.format(m_id)
                cursor.execute(cmd)
                result = cursor.fetchall()[0]
                movie = {
                    'id': result[0],
                    'rate': result[1],
                    'title': result[2],
                    'url': result[3],
                    'cover': result[4],
                    'type': result[5],
                    'time': result[6].strftime('%Y-%m-%d'),
                    'main_actor': result[7],
                    'director': result[8],
                    'star5': result[9],
                    'star4': result[10],
                    'star3': result[11],
                    'star2': result[12],
                    'star1': result[13]
                }
                return HttpResponse(json.dumps(movie))
            except Exception as e:
                print("Error: " + str(e))
    return HttpResponse('服务器发生错误！')
