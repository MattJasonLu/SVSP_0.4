package com.jdlink.util;

import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.*;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.AcroFields.FieldPosition;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.FilteredTextRenderListener;
import com.itextpdf.text.pdf.parser.LocationTextExtractionStrategy;
import com.itextpdf.text.pdf.parser.PdfTextExtractor;
import com.itextpdf.text.pdf.parser.RegionTextRenderFilter;
import com.itextpdf.text.pdf.parser.RenderFilter;
import com.itextpdf.text.pdf.parser.TextExtractionStrategy;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.pdfbox.PDFReader;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.junit.Test;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
//import java.text.FieldPosition;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PdfUtil {
    /**
     * 获取pdf文件中的文字
     * @param multipartFile pdf文件
     * @return 文字内容
     */
    public static List<String> getText(MultipartFile multipartFile) {
        String result = null;
        File pdfFile = null;
        try {
            // 新建PDF文档
            String tempUrl = "temp.pdf";
            pdfFile = new File(tempUrl);
            multipartFile.transferTo(pdfFile);  // 将MultipartFile转为FILE
            int startPage = 1;  // 开始提取页数
            int endPage = Integer.MAX_VALUE;  // 结束提取页数
            PDDocument document = PDDocument.load(pdfFile);   // 加载PDF内容
            PDFTextStripper pts = new PDFTextStripper();
            endPage = document.getNumberOfPages();    // 获取总页数
            pts.setSortByPosition(true);        // 是否排序(按顺序读取pdf数据)
            pts.setStartPage(startPage);        // 设置起始页
            pts.setEndPage(endPage);            // 设置结束页
            //result就是从pdf中解析出来的文本
            result = pts.getText(document);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (pdfFile != null) pdfFile.delete();   // 读取结束后删除文件
        }
        // 字符串筛选处理
        result = result.replaceAll("\r|\n", "/");
        String res[] = result.split(" |//");    // 根据空格符将字符串分割成字符
        List<String> res1 = new ArrayList<>();     // 将数组转为LIST
        for (int i = 0; i < res.length; i++) {
            res1.add(res[i]);
        }
        List<String> newRes = new ArrayList<>();
        newRes.add(res1.get(0));           // 设置转移联单号
        for (int i = 1; i < res1.size(); i++) {
            switch (res1.get(i)) {
                case ("产生单位"):
                    if (res1.get(i + 1).equals("单位盖章")) {
                        newRes.add("");
                        res1.remove(i);               // 数据插入新数组后删除
                        i--;                           // 将位置前移
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;                            // 将位置前移
                    }
                    break;
                case ("电话"):
                    if (res1.get(i + 1).equals("通讯地址")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("通讯地址"):
                    if (res1.get(i + 1).equals("邮编")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("邮编"):
                    if (res1.get(i + 1).equals("运输单位") || res1.get(i + 1).equals("接受单位") || res1.get(i + 1).equals("废物名称")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("运输单位"):
                    if (res1.get(i + 1).equals("电话")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("接受单位"):
                    if (res1.get(i + 1).equals("电话")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("废物名称"):
                    if (res1.get(i + 1).equals("废物类别")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("废物类别"):
                    if (res1.get(i + 1).equals("八位码")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("八位码"):
                    if (res1.get(i + 1).equals("拟转移量")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("拟转移量"):
                    if (res1.get(i + 1).equals("转移量")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("转移量"):
                    if (res1.get(i + 1).equals("签收量")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("签收量"):
                    if (res1.get(i + 1).equals("废物特性")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("废物特性"):
                    if (res1.get(i + 1).equals("形态")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("形态"):
                    if (res1.get(i + 1).equals("包装方式")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("包装方式"):
                    if (res1.get(i + 1).equals("外运目的")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("外运目的："):{
                    newRes.add("");
                    res1.remove(i);                         // 数据插入新数组后删除
                    i--;
                }
                break;
                case ("主要危险成分"):
                    if (res1.get(i + 1).equals("四")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("危险特性与禁忌"):
                    if (res1.get(i + 1).equals("联")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("应急措施"):
                    if (res1.get(i + 1).equals("接受")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("应急设备"):
                    if (res1.get(i + 1).equals("单")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("发运人"):
                    if (res1.get(i + 1).equals("运达地")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("运达地"):
                    if (res1.get(i + 1).equals("转移时间")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("转移时间"):
                    if (res1.get(i + 1).equals("二、废物运输单位填写")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        String e = res1.get(i+1).replaceAll("[\\u4e00-\\u9fa5]","");               // 提起出的英文和数字
                        newRes.add(e);
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("第一承运人"):
                    if (res1.get(i + 1).equals("运输时间")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("运输时间"):
                    if (res1.get(i + 1).equals("车(船)型")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("车(船)型"):
                    if (res1.get(i + 1).equals("牌号")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("牌号"):
                    if(!res1.get(i+1).equals("道路运输证号")&&!res1.get(i+2).equals("道路运输证号")) { // 解决牌号读取乱序问题,如果牌号的后一位且后两位不为”道路运输证号“即出现乱序问题
                        String c = res1.get(i+1).replaceAll("[^\\u4e00-\\u9fa5]","");              // 提取出的中文
                        String e = res1.get(i+1).replaceAll("[\\u4e00-\\u9fa5]","");               // 提起出的英文和数字
                        String c1 = c.substring(0,1);              // 截取中文中第一个字符
                        String newE = c1 + e;          // 拼接车牌号
                        String newC = c.substring(1);            // 截取‘道路运输证号’
                        res1.set(i+1,newE);                     // 设置新数据
                        res1.add(i+2,newC);
                        i--;                                  // 序号重置，重新检查
                    } else if (res1.get(i + 1).equals("道路运输证号")) {            // 如果没有乱序正常执行
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("道路运输证号"):
                    if (res1.get(i + 1).equals("运输起点")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("运输起点"):
                    if (res1.get(i + 1).equals("经由地")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("经由地"):
                    if (res1.get(i + 1).equals("运输终点")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("运输终点"):
                    if (res1.get(i + 1).equals("运输人签字")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("第二承运人"):
                    if (res1.get(i + 1).equals("运输时间")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("经营许可证号"):
                    if (res1.get(i + 1).equals("接收人")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("接收人"):
                    if (res1.get(i + 1).equals("接收日期")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("接收日期"):
                    if (res1.get(i + 1).equals("废物处置方式")) {
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
                case ("废物处置方式"):{
                    newRes.add("");
                    res1.remove(i);                         // 数据插入新数组后删除
                    i--;
                }
                break;
                case ("日期"):
                    if (i == res1.size() - 1) {    // 若日期时最后一个元素则日期为空
                        newRes.add("");
                        res1.remove(i);                         // 数据插入新数组后删除
                        i--;
                    } else {
                        newRes.add(res1.get(i + 1));
                        res1.remove(i);                         // 删除字段
                        res1.remove(i);                // 删除数据
                        i--;
                    }
                    break;
            }
        }
        return newRes;
    }

    ////////////////////////////////
    @Test
    public void test() {
        try {
            List<String> res = new ArrayList<>();
            String filePath = "D:\\test1.pdf";
            PdfReader reader = new PdfReader(filePath);
            float[][] p = getPdfTextPosition(reader);
            res = getPdfTextContent(reader, p);
            for (int i = 0; i < res.size(); i++) {
                if (res.get(i) == null)
                    System.out.println(i + 1 + "数据为空");
                else System.out.println(i + 1 + "数据为：" + res.get(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static float[][] getPdfTextPosition(PdfReader reader) throws Exception {
        AcroFields fields = reader.getAcroFields();
        List<FieldPosition> pos = fields.getFieldPositions("fill");       // 获取pdf中fill编辑域的坐标集
        float[][] coordinates = new float[pos.size()][4];
        // 将每个坐标的四个坐标数据装到二维数组中
        for (int i = 0; i < pos.size(); i++) {
            FieldPosition pitem = pos.get(i);
            Rectangle pRectangle = pitem.position;
            String res = pRectangle.getLeft() + "," + pRectangle.getBottom() + "," + pRectangle.getRight() + "," + pRectangle.getTop();
            System.out.println("坐标为：" + res);
            float[] arr = {pRectangle.getLeft(), pRectangle.getBottom(), pRectangle.getRight(), pRectangle.getTop()};
            coordinates[i] = arr;
        }
        return coordinates;
    }

    public static List<String> getPdfTextContent(PdfReader reader, float[][] p) throws Exception {
        List<String> result = new ArrayList<>();
        // 根据坐标获取相应的数据
        for (int i = 0; i < p.length; i++) {
            Rectangle rect = new Rectangle(p[i][0], p[i][1], p[i][2], p[i][3]);
            RenderFilter regionFilter = new RegionTextRenderFilter(rect);
            TextExtractionStrategy strategys = new FilteredTextRenderListener(new LocationTextExtractionStrategy(), regionFilter);
            String res = PdfTextExtractor.getTextFromPage(reader, 1, strategys);
            result.add(res);
        }
        return result;
    }


    ////////////////////////
}
