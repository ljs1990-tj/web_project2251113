const express = require('express')
const cors = require('cors') 
const db = require("./db");

const app = express()
app.use(cors({
    origin : ["http://192.168.30.57:5502"],
    credentials : true
}))
app.use(express.json());

app.get('/', function (req, res) {
    res.send('qqq') 
})

app.get('/test', (req, res) => {
    res.send("test page(get)");
})

app.post('/test', (req, res) => {
    res.send("test page(post)");
})

app.get('/student', async (req, res) => {
    try {
        let sql = "SELECT * FROM STUDENT";
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result : "success",
            list : list
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.get('/student/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    console.log(stuNo);
    try {
        let sql = "SELECT * FROM STUDENT WHERE STU_NO = " + stuNo;
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result : "success",
            info : list[0]
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.delete('/student/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    console.log(stuNo);
    try {
        let sql = "DELETE FROM STUDENT WHERE STU_NO = " + stuNo;
        let result = await db.query(sql);
        console.log("result ==> ", result);
        res.json({
            result : result,
            msg : "success"
            
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.post('/student', async (req, res) => {
    let {stuNo, stuName, stuDept} = req.body
    console.log(req.body);
    try {
        let sql = "INSERT INTO STUDENT (STU_NO, STU_NAME, STU_DEPT) VALUES(?, ?, ?)";
        let result = await db.query(sql, [stuNo, stuName, stuDept]);
        
        res.json({
            mgs : "success",
            result : result
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.post('/student/login', async (req, res) => {
    let {stuNo, stuName} = req.body
    console.log(req.body);
    try {
        let sql = "SELECT * FROM STUDENT WHERE STU_NO = ?";
        let [list] = await db.query(sql, [stuNo]);
        let msg = "";
        let result = "fail";
        if(list.length > 0){
            // 학번으로 조회 성공
            if(list[0].stu_name == stuName){
                msg = list[0].stu_name + "님 환영합니다!";
                result = "success";
            } else {
                msg = "해당 이름을 가진 학생이 없습니다.";
            }
        } else {
            // 학번 조회 실패
            msg = "학번을 확인해주세요.";
        }
        console.log(list);
        res.json({
            msg : msg,
            result : result
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.listen(3000, ()=>{
    console.log("server start!");
})