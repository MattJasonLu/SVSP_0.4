package com.jdlink.util;

import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.*;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.junit.Test;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class PdfUtil {

    /**
     * 获取pdf文件中的文字
     * @param multipartFile pdf文件
     * @return 文字内容
     */
    public static String getText(MultipartFile multipartFile) {
        File pdfFile = null;
        // 是否排序
        boolean sort = false;
        try {
            String tempUrl = "temp.pdf";
            pdfFile = new File(tempUrl);
            multipartFile.transferTo(pdfFile);

            // 开始提取页数
            int startPage = 1;
            // 结束提取页数
            int endPage = Integer.MAX_VALUE;
            String content = null;
            PDDocument document = PDDocument.load(pdfFile);
            PDFTextStripper pts = new PDFTextStripper();
            endPage = document.getNumberOfPages();
//            System.out.println("Total Page: " + endPage);
            pts.setSortByPosition(sort);
            pts.setStartPage(startPage);
            pts.setEndPage(endPage);
            //content就是从pdf中解析出来的文本
            content = pts.getText(document);
            return content;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (pdfFile != null) pdfFile.delete();
        }
    }

    /**
     * 通过iText导出文件内容
     * @param multipartFile pdf文件
     * @return 文件内容
     */
    public static String getText2(MultipartFile multipartFile) {
        File pdfFile = null;
        try {
            String tempUrl = "temp.pdf";
            pdfFile = new File(tempUrl);
            multipartFile.transferTo(pdfFile);
            PdfReader reader = new PdfReader(pdfFile.getAbsolutePath());
            PdfReaderContentParser parser = new PdfReaderContentParser(reader);
            StringBuffer buff = new StringBuffer();
            TextExtractionStrategy strategy;
            for (int i = 1; i <= reader.getNumberOfPages(); i++) {
                strategy = parser.processContent(i, new SimpleTextExtractionStrategy());
                buff.append(strategy.getResultantText());
            }
            return buff.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {

            if (pdfFile != null) pdfFile.delete();
        }
    }

    public static float[] getPdfTextPosition(PdfReader reader) throws Exception {
        AcroFields fields = reader.getAcroFields();
        List<AcroFields.FieldPosition> pos = fields.getFieldPositions("fill_1");
        AcroFields.FieldPosition pitem = pos.get(0);
        Rectangle pRectangle = pitem.position;
        String res = pRectangle.getLeft()+","+pRectangle.getBottom()+","+pRectangle.getRight()+","+pRectangle.getTop();
//        System.out.println(res);
        float[] arr = {pRectangle.getLeft(), pRectangle.getBottom(), pRectangle.getRight(), pRectangle.getTop()};
        return arr;
    }

    public static String getPdfTextContent(PdfReader reader, float[] p) throws Exception {
        Rectangle rect = new Rectangle(p[0], p[1], p[2], p[3]);
        RenderFilter regionFilter = new RegionTextRenderFilter(rect);
        TextExtractionStrategy strategys = new FilteredTextRenderListener(new LocationTextExtractionStrategy(), regionFilter);
        String res = PdfTextExtractor.getTextFromPage(reader, 1, strategys);
        System.out.println(res);
        return res;
    }

    @Test
    public void test() {
        String res = "";
        String filePath = "H:/test1.pdf";
        PdfReader reader = null;
        try {
            reader = new PdfReader(filePath);
            float[] p = getPdfTextPosition(reader);
            res = getPdfTextContent(reader, p);
            System.out.println(res);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }




}
