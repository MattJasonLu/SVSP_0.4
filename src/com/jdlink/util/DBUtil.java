package com.jdlink.util;

import java.lang.String;
import java.net.URLEncoder;
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
import java.io.*;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import javax.servlet.http.HttpServletResponse;

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

    public void exportExcel(String name,HttpServletResponse response)  throws IOException {// Table_name 数据库中想要导出的指定表名
        // 创建Excel表。
        org.apache.poi.ss.usermodel.Workbook book = new HSSFWorkbook();
        try {
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
        } catch (Exception e) {
            e.printStackTrace();
        }//.......................

        // 保存
        //book.write(new FileOutputStream("D://" + name + ".xls"));
        ByteArrayOutputStream fos = null;
        byte[] retArr = null;
        try {
            fos = new ByteArrayOutputStream();
            book.write(fos);
            retArr = fos.toByteArray();
        } finally {
            try {
                fos.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        OutputStream os = response.getOutputStream();
        try {
            //为了让各种浏览器可以识别,需要将中文转换成Byte形式,然后通过ISO-8859-1进行编码
            // OutputStream os = response.getOutputStream();
            String file = "filename";
            name = new String(file.getBytes("iso8859-1"), "utf-8");
            response.reset();
            //设置content-disposition响应头控制浏览器以下载的形式打开文件
            //报头用于提供一个推荐的文件名，并强制浏览器显示保存对话框
            //attachment表示以附件方式下载。如果要在页面中打开，则改为 inline
            response.setHeader("Content-Disposition", "attachment; filename="+name+".xls");//要保存的文件名

            response.setContentType("application/octet-stream; charset=utf-8");
            book.write(os);
            os.flush();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (os != null) {
            try {
                os.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // 保存
        //book.write(new FileOutputStream("D://" + name + ".xls"));
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