// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// 1) SQLite DB 파일 경로
const dbPath = path.join(__dirname, 'mydb.sqlite'); 
// ↑ 실제 DB 파일 이름으로 변경 (예: 'test.db')

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ DB 연결 실패:', err.message);
  } else {
    console.log('✅ SQLite DB 연결 성공:', dbPath);
  }
});

// 2) 정적 파일 제공 (public 폴더)
app.use(express.static(path.join(__dirname, 'public')));

// 3) test 테이블에서 userid, phone 조회 API
app.get('/api/test', (req, res) => {
  const sql = 'SELECT userid, phone FROM test';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('❌ SQL 에러:', err.message);
      return res.status(500).json({ error: 'DB 오류' });
    }
    res.json(rows); // [{userid:'u1', phone:'010...'}, ...]
  });
});

// 4) 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
