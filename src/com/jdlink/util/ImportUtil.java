package com.jdlink.util;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.NumberFormat;

public class ImportUtil {
    public final static String url = "jdbc:mysql://172.16.1.92:3306/jdlink"; // 数据库URL
    public final static String user = "root"; // 数据库用户名
    public final static String password = "123456"; // 数据库密码
    public static Connection con;

    public ImportUtil() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            // 连接数据库
            con = (Connection) DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    /**
     * 导入
     *
     * @param file
     * @param DBTableName
     */
    public Object[][] importExcel(MultipartFile file, String DBTableName, String id) {

        try {
            return UploadExcel(file, DBTableName, id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Object[][] UploadExcel(MultipartFile file, String DBTableName, String id) throws Exception {
        //定义一维数组，存放Excel表里的每一行的各个列的数据
        Object[] obj;
        Object[][] parm;
        InputStream is = null;
        Workbook rwb = null;
        try {
            //定义文本输入流
            is = file.getInputStream();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            //打开Workbook
            rwb = Workbook.getWorkbook(is);
        } catch (BiffException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //获取Excel表的Sheet1区域的数据
        Sheet sht = rwb.getSheet(0);//得到第一个表d
        int col = sht.getColumns(); //获得Excel列
        int row = sht.getRows(); //获得Excel行
        Cell c1;

        parm = new Object[row - 1][col];
        //将数据装到parm中去
        //i=1 去掉表格第一行的属性名
        for (int i = 1; i < row; i++) {
            obj = new Object[col];
            for (int j = 1; j < col; j++) {
                c1 = sht.getCell(j, i);
                obj[j] = c1.getContents();
                //在此转换中英文
                if (obj[j] == "")
                    obj[j] = null;
                parm[i - 1][j] = obj[j];
            }
            NumberFormat nf = NumberFormat.getInstance();
            //设置是否使用分组
            nf.setGroupingUsed(false);
            //设置最大整数位数
            nf.setMaximumIntegerDigits(4);
            //设置最小整数位数
            nf.setMinimumIntegerDigits(4);
            parm[i - 1][0] = nf.format(Integer.parseInt(id) + i - 1);
        }
        is.close();
        return parm;
    }

//    public void listToDB() {
//        //将parm中数据批处理插入到数据库中
//        QueryRunner queryRunner = new QueryRunner(true);
//        String sql = generateSql(col, DBTableName);
//        try {
//            queryRunner.batch(con, sql, parm);
//        } catch (SQLException e) {
//            e.printStackTrace();
//            //数据完全重复时才会抛出
//            throw new IllegalArgumentException("客户数据重复！");
//        }
//    }

    public String generateSql(int columnCount, String DBTableName) {
        String prefix = "INSERT INTO " + DBTableName + " VALUES (";
        String suffix = ")";
        for (int i = 0; i < columnCount; i++) {
            if (i == columnCount - 1) {
                prefix += "?" + suffix;
                break;
            }
            prefix += "?,";
        }
        return prefix;
    }


}

