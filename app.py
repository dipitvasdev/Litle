from flask import Flask,render_template,request
import numpy as np
import os
import time
import json
global student_name
student_dict={}
import pickle as pkl

# CRITICAL MODEL CODE START
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from gensim.models.doc2vec import Doc2Vec
import gensim
class LabeledLineSentence(object):
    def __init__(self, doc_list, labels_list):
        self.labels_list = labels_list
        self.doc_list = doc_list
    def __iter__(self):
        for idx, doc in enumerate(self.doc_list):
              yield gensim.models.doc2vec.LabeledSentence(doc,
[self.labels_list[idx]])
cred = credentials.Certificate("dredu-71835-firebase-adminsdk-wzuam-6eaf312a3c.json")
new=firebase_admin.initialize_app(cred,name='DrEdu2')
bucket=storage.bucket('dredu-71835.appspot.com',new)
# CRITICAL MODEL CODE ENDS
app=Flask(__name__,static_folder='static/')
@app.route('/')
def load_login_page():
    return render_template('student_login.html')
@app.route('/welcome',methods=['POST'])
def welcome():
    global student_name
    global student_dict
    if request.method=="POST":
        try:
            student_name=request.form['name']
            reader=open("filedata.pickle","rb")
            student_dict=pkl.load(reader)
            reader.close()
            print(student_dict)
            if(not(student_name in student_dict)):
                print("REWRTING1")
                writer=open("filedata.pickle","wb")
                student_name=request.form['name']
                student_dict[student_name]=[]
                student_dict[student_name].append("Student")
                student_dict[student_name].append("person.png")
                pkl.dump(student_dict,writer)
                writer.close()
        except:
            print("REWRITING")
            print(student_dict)
            writer=open("filedata.pickle","wb")
            student_name=request.form['name']
            student_dict[student_name]=[]
            student_dict[student_name].append("Student")
            student_dict[student_name].append("person.png")
            pkl.dump(student_dict,writer)
            writer.close()
    return render_template('Welcome.html',result=student_name)
@app.route('/profile',methods=['POST','GET'])
def profile():
    global student_name
    print(student_dict)
    if request.method=='POST':
        bio=request.form['bio']
        pic=request.files['pic_file']
        pic.save("static/"+pic.filename)
        student_dict[student_name][0]=bio
        student_dict[student_name][1]=pic.filename
        writer=open("filedata.pickle","wb")
        pkl.dump(student_dict,writer)
        writer.close()
    return render_template('profile.html',result=[student_name,student_dict[student_name][0],student_dict[student_name][1]])
@app.route('/reports')
def my_report():
    global student_name
    return render_template('report.html')
@app.route('/assignment')
def assignment():
    return render_template('assignment.html',result=student_name)
@app.route('/query')
def load_doubts():
    global student_name
    return render_template('Stuquery.html',result=student_name)
@app.route('/query/askquery')
def ask_doubts():
    global student_name
    return render_template('AskDoubt.html',result=student_name)
@app.route('/query/yourquery')
def your_doubts():
    global student_name
    return render_template('yourdoubt.html',result=student_name)
@app.route('/query/allquery',methods=['POST','GET'])
def all_doubts():
    global student_name
    return render_template('alldoubts.html',result=student_name)
@app.route('/test_portal.html')
def testportallogin():
    return render_template('test_portal.html',result=student_name)
@app.route('/quiz')
def quiz():
    return render_template('Quiz.html',result=student_name)
@app.route('/short-answer')
def short():
    return render_template('short_answer.html',result=student_name)
@app.route('/subjective')
def subjective():
    return render_template('subjective.html',result=student_name)
@app.route('/success')
def submitted():
    batch="CSE"
    client=bucket.client
    c=client.list_blobs(bucket,prefix=batch+"/")
    st=time.localtime()
    a=str(st.tm_mday)+'-'+str(st.tm_mon)+'-'+str(st.tm_year)
    dat=a
    docLabels=[]
    for it in c:
        string=str(it)
        if('test' in string):
            l = string.split('/')
            name = l[1]
            if(dat in string):
                if(".rtf" in string):
                    docLabels.append(name+".txt")
                    it.download_to_filename(name + ".txt")
    data=[]
    for doc in docLabels:
        ac=open(doc).read()
        ac.replace("%s%","")
        data.append(ac)
    it = LabeledLineSentence(data, docLabels)
    model = gensim.models.Doc2Vec(size=300, window=10, workers=10,alpha=0.025, min_alpha=0.025)
    print(docLabels)
    print(it)
    model.build_vocab(it)
    model.train(it,total_examples=model.corpus_count,epochs=1000)
    for i in docLabels:
        if(len(docLabels)==1):
            sims=100
        else:
            sims=model.docvecs.most_similar(i)[0][1]*100
        p=i[:-4]
        path="CSE/"+p+"/test/ADA/"+dat+"/plag.txt"
        print(path)
        blob=bucket.blob(path)
        blob.upload_from_string(str(sims)+" status: Not Evaluated",'application/octet-stream')
    return render_template('submitted.html')
if __name__=='__main__':
	app.run(debug = True, use_reloader=False)
