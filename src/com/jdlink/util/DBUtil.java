package com.jdlink.util;

import java.lang.String;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.junit.Test;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.dbutils.QueryRunner;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;

import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;

import jxl.read.biff.BiffException;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;


public class DBUtil {
    public final static String url = "jdbc:mysql://172.16.1.92:3306/jdlink"; // 数据库URL
    public final static String user = "root"; // 数据库用户名
    public final static String password = "123456"; // 数据库密码
    public static Connection con;

    public DBUtil() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            // 连接数据库
            con = (Connection) DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String exportExcel(String name) {// Table_name 数据库中想要导出的指定表名
        JSONObject res = new JSONObject();
        try {
            // 创建Excel表。
            org.apache.poi.ss.usermodel.Workbook book = new HSSFWorkbook();
            // 在当前Excel创建一个子表
            org.apache.poi.ss.usermodel.Sheet sheet = book.createSheet(name);
            Statement st = (Statement) con.createStatement();
            // 创建sql语句，对team进行查询所有数据
            String sql = "select * from jdlink." + name;
            ResultSet rs = st.executeQuery(sql);
            // 设置表头信息（写入Excel左上角是从(0,0)开始的）
            Row row1 = sheet.createRow(0);
            ResultSetMetaData rsmd = rs.getMetaData();
            int colnum = rsmd.getColumnCount();
            for (int i = 1; i <= colnum; i++) {
                String columnName = rsmd.getColumnName(i);
                // 单元格
                org.apache.poi.ss.usermodel.Cell cell = row1.createCell(i - 1);
                // 写入数据
                cell.setCellValue(columnName);
            }
            // 设置表格信息
            int idx = 1;
            while (rs.next()) {
                // 行
                Row row = sheet.createRow(idx++);
                for (int i = 1; i <= colnum; i++) {
                    String str = rs.getString(i);
                    // 单元格
                    org.apache.poi.ss.usermodel.Cell cell = row.createCell(i - 1);
                    // 写入数据
                    cell.setCellValue(str);
                }
            }
            // 保存
            book.write(new FileOutputStream("D://" + name + ".xls"));
            res.put("status", "success");
            res.put("message", "导出成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败，请重试！");
        }
        return res.toString();
    }


    public void importExcel(MultipartFile file,String DBTableName) {

        try {
            UploadExcel(file,DBTableName);
            } catch (Exception e) {
            e.printStackTrace();
            }


    }
    public void UploadExcel(MultipartFile file,String DBTableName) throws Exception {
            //定义一维数组，存放Excel表里的每一行的各个列的数据
            Object[] obj ;
            Object[][] parm;
            //定义List集合，存放每一行的数据
            ArrayList<Object[]> list = new ArrayList<>();
            InputStream is = null;
            Workbook rwb = null;
            try {
                is = file.getInputStream();//定义文本输入流
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }catch (IOException e) {
                e.printStackTrace();
            }
            try {
                rwb = Workbook.getWorkbook(is);//打开Workbook
            } catch (BiffException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            //获取Excel表的Sheet1区域的数据
            Sheet sht = rwb.getSheet(0);//得到第一个表d
            int col = sht.getColumns(); //获得Excel列
            int row = sht.getRows(); //获得Excel行
            Cell c1 ;
            parm=new Object[row-1][col];
            //将数据装到parm中去
            for(int i=1; i < row; i++){
                obj = new Object[col];
                for(int j =0 ;j <col; j++){
                    c1 = sht.getCell(j,i);
                    //add
                    String contents = c1.getContents();
                  //  System.out.println(contents);
                    obj[j] = c1.getContents();
                    parm[i-1][j]=obj[j];
                }
                //System.out.println("------------");
                //list.add(obj);
                //System.out.println(list);
            }
            //将parm中数据批处理插入到数据库中

            QueryRunner queryRunner = new QueryRunner(true);
            String sql=generateSql(col,DBTableName);
            try {
                 queryRunner.batch(con, sql, parm);
            } catch (SQLException e) {
                 e.printStackTrace();
                 throw new IllegalArgumentException("客户数据重复！");
            }
        }
    public String  generateSql(int columnCount,String DBTableName) {
        String prefix = "INSERT INTO " + DBTableName + " VALUES (";
        String suffix = ")";
        for (int i = 0; i < columnCount; i++) {
            if (i == columnCount - 1) {
                prefix += "?"+suffix;
                break;
            }
            prefix += "?,";
        }
        return prefix;
    }


}