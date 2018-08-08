package com.jdlink.util;

import java.lang.String;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.poi.xssf.binary.XSSFBUtils;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.xssf.usermodel.charts.XSSFDateAxis;
import org.springframework.web.multipart.MultipartFile;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.io.*;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletResponse;

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

    /**
     * 导出
     * @param name
     * @param response
     * @param sqlWords
     * @throws IOException
     */
    public void exportExcel(String name,HttpServletResponse response,String sqlWords)  throws IOException {// Table_name 数据库中想要导出的指定表名
        // 创建Excel表。
        org.apache.poi.ss.usermodel.Workbook book = new HSSFWorkbook();
        try {
            // 在当前Excel创建一个子表
            org.apache.poi.ss.usermodel.Sheet sheet = book.createSheet(name);
            Statement st = (Statement) con.createStatement();
            // 创建sql语句，对team进行查询所有数据
            String sql = sqlWords;
            ResultSet rs = st.executeQuery(sql);
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
        ByteArrayOutputStream fos = null;
        try {
            fos = new ByteArrayOutputStream();
            book.write(fos);
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
            String file = name;//初始文件名
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

        // 保存  以固定名保存到固定路径
        //book.write(new FileOutputStream("D://" + name + ".xls"));
    }


    /**
     * 导入
     * @param file
     * @param DBTableName
     */
    public void importExcel(MultipartFile file,String DBTableName,String id) {

        try {
            UploadExcel(file,DBTableName,id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void UploadExcel(MultipartFile file,String DBTableName,String id) throws Exception {
        //定义一维数组，存放Excel表里的每一行的各个列的数据
        Object[] obj;
        Object[][] parm;
        InputStream is = null;

        String fileName = file.getOriginalFilename();
        try {
            //定义文本输入流
            is = file.getInputStream();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        //2003
        if (fileName.endsWith("xls")) {
            try {
                //打开Workbook
                //rwb = WorkbookFactory.create(is);
                Workbook rwb;
                rwb = Workbook.getWorkbook(is);
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
                //将parm中数据批处理插入到数据库中
                QueryRunner queryRunner = new QueryRunner(true);
                String sql = generateSql(col, DBTableName);
                try {
                    queryRunner.batch(con, sql, parm);
                    is.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                    //数据完全重复时才会抛出
                    throw new IllegalArgumentException("数据重复！");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        //获取Excel表的Sheet1区域的数据
        //return parm;
        //2007
        if (fileName.endsWith("xlsx")) {
            XSSFWorkbook xwb = new XSSFWorkbook(is);
            XSSFSheet xSheet = xwb.getSheetAt(0);
            //获得总列数
            int col=xSheet.getRow(0).getPhysicalNumberOfCells();
            int row=xSheet.getLastRowNum();//获得总行数
            //int row = xSheet.getPhysicalNumberOfRows();
            System.out.println(row);
            parm = new Object[row][col];
            for (int i = 1; i < row+1; i++) {
                XSSFRow row1 = xSheet.getRow(i);
                obj = new Object[col];
                for (int j = 1; j < col; j++) {
                    XSSFCell cellStyle = row1.getCell(j);
                    if(cellStyle!=null){
                        String cat= cellStyle.getCellTypeEnum().toString();
                        if(cat=="NUMERIC"){
                            obj[j] = cellStyle.getNumericCellValue();
                            int style = cellStyle.getCellStyle().getDataFormat();
                            if (HSSFDateUtil.isCellDateFormatted(cellStyle)){
                                Date date = cellStyle.getDateCellValue();
                                switch (style) {
                                    case 178:
                                        obj[j] = new SimpleDateFormat("yyyy'年'M'月'd'日'").format(date);
                                        break;
                                    case 14:
                                        obj[j] = new SimpleDateFormat("yyyy/MM/dd").format(date);
                                        break;
                                    case 179:
                                        obj[j] = new SimpleDateFormat("yyyy/MM/dd").format(date);
                                        break;
                                    case 181:
                                        obj[j] = new SimpleDateFormat("yyyy/MM/dd").format(date);
                                        break;
                                    case 22:
                                        obj[j] = new SimpleDateFormat(" yyyy/MM/dd").format(date);
                                        break;
                                    default:
                                        break;
                                }

                            }
                        }
                        if(cat=="STRING"){
                            obj[j] = cellStyle.getStringCellValue();
                        }

//                   else {
//                            SimpleDateFormat sdf=new SimpleDateFormat("yyyy/MM/dd");
//                            obj[j]= sdf.format(cellStyle.getDateCellValue());
//                        }
                        System.out.println(obj[j]);
                    }
                    else {
                        obj[j]="";
                    }
                    //在此转换中英文
                    if (obj[j] == "")
                        obj[j] = null;
                    parm[i-1][j] = obj[j];
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
            //将parm中数据批处理插入到数据库中
            QueryRunner queryRunner = new QueryRunner(true);
            String sql = generateSql(col, DBTableName);
            try {
                queryRunner.batch(con, sql, parm);
                is.close();
            } catch (SQLException e) {
                e.printStackTrace();
                //数据完全重复时才会抛出
                throw new IllegalArgumentException("数据重复！");
            }
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

//    private String getValue(XSSFCell xCell) {
//        if (xCell.getCellType() == XSSFCell.CELL_TYPE_BOOLEAN) {
//            return String.valueOf(xCell.getBooleanCellValue());
//        } else if (xCell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC) {
//            return String.valueOf(xCell.getNumericCellValue());
//        } else {
//            return String.valueOf(xCell.getStringCellValue());
//        }
//    }
}