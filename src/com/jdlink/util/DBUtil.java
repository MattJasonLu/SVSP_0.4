package com.jdlink.util;

import java.lang.String;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import com.jdlink.domain.Produce.WayBill;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;


public class DBUtil {
    public final static String url = "jdbc:mysql://172.16.1.92:3306/jdlink"; // 数据库URL
    public final static String user = "root"; // 数据库用户名
    public final static String password = "123456"; // 数据库密码
    public static Connection con;
    private static Map<String, String> map = new HashMap<String, String>() { // 枚举类型(导出需要转化为中文的数据)
        {
            put("Examining", "审批中"); // CheckState
            put("ToSubmit", "待提交");
            put("Finished", "已完成");
            put("Backed", "已驳回");
            put("ToExamine", "待审批");
            put("Keeping", "履约中");
            put("Invalid", "已作废");
            put("Enabled", "生效中");
            put("Disabled", "已失效");
            put("Tested", "已化验");
            put("Submitted", "已提交");
            put("Confirm", "已确认");
            put("NewBuild", "新建");
            put("Approval", "审批通过");
            put("ToInbound", "待入库");
            put("ToPick", "待领料");
            put("Picked", "已领料");
            put("OutBounded", "已出库");
            put("Processed", "已处理");
            put("ToGenerated", "待生成物料");
            put("Retired", "已退库");
            put("ToCollected", "待收样");
            put("Collected", "已收样");
            put("Rejected", "已拒收");
            put("ToSignIn", "待签收"); // ApplyState
            put("SignedIn", "已签收");
            put("Appointed", "已预约");
            put("SampleTaked", "已取样");
            put("Canceld", "预约取消");
            put("Received", "已收样");
            put("Gas", "气体"); // FormType
            put("Liquid", "液态");
            put("Solid", "气体");
            put("HalfSolid", "半固态");
            put("Solid1AndHalfSolid", "固态+半固态");
            put("HalfSolidAndLiquid", "半固态+液态");
            put("Solid1AndLiquid", "固态+液态");
//            put("Enabled", "已启用");        // ClientState
//            put("Disabled", "已禁用");
            put("EnquiryClient", "询价客户");       // ClientType
            put("TemporaryClient", "临时客户");
            put("FormalClient", "正式客户");
            put("Wastes", "危废合同");      // ContractType
            put("Emergency", "应急处置合同");
            put("Derive", "次生合同");
            put("Purchase", "采购合同");
            put("Logistics", "物流合同");
            put("Bag", "吨袋");   // PackageType
            put("Box", "标准箱");
            put("Ton", "吨箱");
            put("Pouch", "小袋");
            put("Iron", "铁桶");
            put("Ibc", "吨桶");
            put("Plastic", "塑料桶");
            put("Kg", "公斤");   // Unit
            put("T", "吨");
            put("Catty", "斤");
            put("Set", "套");
//            put("Box", "盒");
            put("Platform", "台");
            put("Root", "根");
            put("Chest", "箱");
            put("Spread", "张");
            put("Only", "只");
            put("Hold", "把");
            put("Metre", "米");
            put("Bucket", "桶");
            put("Package", "包");
            put("Individual", "个");
            put("Volume", "卷");
            put("Square", "平方");
            put("Disc", "盘");
            put("DeriveDisposal", "次生处置供方");   // SupplierType
            put("Transport", "运输类供方");
          //  put("Purchase", "采购供方");
            put("Others", "其他供方");
            put("Declared", "已申报"); // ApplicationStatus
            put("Undeclared", "未申报");
            put("Delete", "删除");  // RecordState
            put("Usable", "可用");
         //   put("Disabled", "不可用");
            put("ToInBound", "待入库");  // IngredientsState
            put("InBounded", "已入库");
            put("PartInBound", "部分入库");
            put("ToReceive", "待领用");
          //  put("Received", "已领用");
            put("PartReceived", "部分领用");
            put("ToOutBound", "待出库");
        //    put("OutBounded", "已出库");
            put("PartOutBound", "部分出库");
            put("MedicalCookingSystem", "医疗蒸煮系统"); // Equipment
            put("SecondaryTwoCombustionChamber", "二期二燃室");
            put("ThirdPhasePretreatmentSystem", "三期预处理系统");
            put("Prepare2", "备2");
            put("Sludge", "污泥");   // HandleCategory
            put("WasteLiquid", "废液");
            put("Bulk", "散装料");
            put("Crushing", "破碎料");
            put("Distillation", "精馏残渣");
            put("Suspension", "悬挂链");
            put("Jelly", "果冻状");
            put("Burning", "焚烧");  // ProcessWay
            put("Landfill", "填埋");
            put("Clean", "清洗");
            put("Chlorine", "氯");  // ChemicalType
            put("Fluorine", "氟");
            put("Bromine", "溴");
            put("Iodine", "碘");
            put("Sulphur", "硫");
            put("Phosphorus", "磷");
            put("Nitrogen", "氮");
            put("companyContract", "公司合同");  // ContractVersion
            put("customerContract", "产废单位合同");
            put("Contract", "合同");  // DocumentType
            put("ManagePlan", "管理计划");
            put("EIA", "环评");
            put("BusinessLicense", "营业执照");
            put("Instruction", "说明");
            put("InvoiceInfo", "开票资料");
            put("MSDS", "物质成分表");
            put("StateOwnedEnterprises", "国有企业");  // EnterpriseType
            put("CollectiveEnterprise", "集体企业");
            put("JointStockByStateOwnedEnterprises", "国有企业改组的股份合作企业");
            put("JointStockByCollectiveEnterprise", "集体企业改组的股份合作企业");
            put("LimitedLiabilityCompany", "有限责任公司");
            put("ThePrivateEnterprise", "私营企业");
            put("Comprehensive", "综合");  //OperationMode
            put("Collect", "收集");
            put("Production", "生产");
            put("Established", "已建立");   // OperationRecord
            put("Unestablished", "未建立");
            put("WasteAndClinical", "利用处置危险废物及医疗废物");   // OperationType
            put("CollectOnly", "只从事收集活动");
            put("WasteOnly", "只利用处置危险废物");
            put("ClinicalOnly", "只处置医疗废物");
            put("Jiangsu", "江苏省");  // Province
            put("Beijing", "北京市");
            put("Shanghai", "上海市");
            put("TianJing", "天津市");
            put("ChongQing", "重庆市");
            put("HongKong", "香港");
            put("LiaoNing", "辽宁");
            put("HeNan", "河南省");
            put("ZheJiang", "浙江省");
            put("AnHui", "安徽省");
            put("None", "无味");  //SmellType
            put("Fragrant", "香味");
            put("Odour", "臭味");
            put("Not", "不溶");  //Solubility
            put("Few", "微溶");
            put("All", "溶水");
            put("Rate1", "增值税专用发票16%");  //TicketRate1
            put("Rate2", "增值税专用发票3%");
            put("Highway", "公路");  //TransportType
            put("Railway", "铁路");
            put("Waterway", "水路");
            put("Aviation", "航空");
            put("Perchlorhydria", "过氯化物");  //WasteInclusionType
            put("Organonitrogen", "有机氮");
            put("DiethylEther", "乙醚");
            put("Benzene", "苯");
            put("Peroxide", "过氧化物");
            put("Radioactive", "放射性物质");
            put("Lacrimation", "催泪物质");
            put("PolychlorinatedBiphenylTerphenyls", "多氯联苯-聚氯三联苯");
            put("OrganicCyanogen", "有机氰");
            put("Anhydride", "酸酐");
            put("Selenide", "硒化物");
            put("Oxidant", "氧化剂");
            put("Explosive", "爆炸物");
            put("BiochemistryWaste", "生化废料");
            put("Phenol", "苯酚");
            put("Reductant", "还原剂");
            put("ProtectiveGlasses", "防护眼镜"); // WasteProtect
            put("ProtectiveGarment", "防护服");
            put("ProtectiveMask", "防护面罩");
            put("HalfMask", "半面罩");
            put("CoverMask", "全面罩");
            put("PositiveRespirator", "正压呼吸器");
            put("ProtectiveGloves", "防护手套");
        }
    };

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
     *
     * @param name
     * @param response
     * @param sqlWords
     * @throws IOException
     */
    public void exportExcel(String name, HttpServletResponse response, String sqlWords) throws IOException {// Table_name 数据库中想要导出的指定表名
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
            //设置表头信息
            for (int i = 1; i <= colnum; i++) {
                //   String columnName = rsmd.getColumnLabel(i);               // 获取数据库表头别名
                String columnName = rsmd.getColumnLabel(i);   //中文表头               // 获取数据库表头原名
                //       System.out.println("别名：" + columnName);
                // 单元格
                org.apache.poi.ss.usermodel.Cell cell = row1.createCell(i - 1);
                // 写入数据
                cell.setCellValue(columnName);
            }
            // 设置表格信息
            int idx = 1;
            // 当下一行非空时执行操作
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
            response.setHeader("Content-Disposition", "attachment; filename=" + name + ".xls");//要保存的文件名
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
     * 导出(带表头字段)
     *
     * @param name
     * @param response
     * @param sqlWords
     * @throws IOException
     */
    public void exportExcel2(String name, HttpServletResponse response, String sqlWords, String tableHead) throws IOException {// Table_name 数据库中想要导出的指定表名
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
            //获取表头数组
            String tHead[] = tableHead.split("/");
            //设置表头信息
            for (int i = 1; i <= colnum; i++) {
                org.apache.poi.ss.usermodel.Cell cell = row1.createCell(i - 1);
                // 写入数据
                cell.setCellValue(tHead[i - 1]);
            }
            // 设置表格信息
            int idx = 1;
            // 当下一行非空时执行操作
            while (rs.next()) {
                // 行
                Row row = sheet.createRow(idx++);
                for (int i = 1; i <= colnum; i++) {
                    String str = rs.getString(i);
                    // 单元格
                    org.apache.poi.ss.usermodel.Cell cell = row.createCell(i - 1);
                    // 写入数据
                    cell.setCellValue(translation(str));
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
            response.setHeader("Content-Disposition", "attachment; filename=" + name + ".xls");//要保存的文件名
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
     * 将导出的英文转为中文
     *
     * @param name
     * @return
     */
    public String translation(String name) {
        if (map.keySet().contains(name)){ // 如果字符串是枚举类型的英文，将其转化为中文
            name = map.get(name);
        }
        return name;
    }


    /**
     * 导入
     *
     * @param file
     * @param DBTableName
     */
    public void importExcel(MultipartFile file, String DBTableName, String id) {

        try {
            UploadExcel(file, DBTableName, id);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void UploadExcel(MultipartFile file, String DBTableName, String id) throws Exception {
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
            int col = xSheet.getRow(0).getPhysicalNumberOfCells();
            int row = xSheet.getLastRowNum();//获得总行数
            //int row = xSheet.getPhysicalNumberOfRows();
            System.out.println(row);
            parm = new Object[row][col];
            for (int i = 1; i < row + 1; i++) {
                XSSFRow row1 = xSheet.getRow(i);
                obj = new Object[col];
                for (int j = 1; j < col; j++) {
                    XSSFCell cellStyle = row1.getCell(j);
                    if (cellStyle != null) {
                        String cat = cellStyle.getCellTypeEnum().toString();
                        if (cat == "NUMERIC") {
                            obj[j] = cellStyle.getNumericCellValue();
                            int style = cellStyle.getCellStyle().getDataFormat();
                            if (HSSFDateUtil.isCellDateFormatted(cellStyle)) {
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
                        if (cat == "STRING") {
                            obj[j] = cellStyle.getStringCellValue();
                        }

//                   else {
//                            SimpleDateFormat sdf=new SimpleDateFormat("yyyy/MM/dd");
//                            obj[j]= sdf.format(cellStyle.getDateCellValue());
//                        }
                        System.out.println(obj[j]);
                    } else {
                        obj[j] = "";
                    }
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
        }
    }

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