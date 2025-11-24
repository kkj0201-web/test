package com.test;

import java.io.IOException;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet("/testdata")
public class TestDataServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json; charset=UTF-8");

        // ★ DB 파일 경로 바꾸세요 (중요)
        String url = "jdbc:sqlite:C:/YOUR_PATH/test.db";

        JSONArray arr = new JSONArray();

        try (Connection conn = DriverManager.getConnection(url)) {
            String sql = "SELECT userid, phone FROM test";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                JSONObject obj = new JSONObject();
                obj.put("userid", rs.getString("userid"));
                obj.put("phone", rs.getString("phone"));
                arr.put(obj);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        response.getWriter().print(arr.toString());
    }
}
