package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Inventory.InboundPlanOrder;
import com.jdlink.domain.Produce.Pounds;
import com.jdlink.domain.Produce.WayBill;
import com.jdlink.domain.Produce.WayBillItem;
import com.jdlink.service.ClientService;
import com.jdlink.service.InboundService;
import com.jdlink.service.PoundsService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import jxl.write.DateTime;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.rmi.CORBA.Util;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;
import java.io.*;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.jdlink.util.DateUtil.getDateStr;
import static com.jdlink.util.DateUtil.getTimeSecondStr;
import static com.sun.xml.internal.ws.policy.sourcemodel.wspolicy.XmlToken.Name;

@Controller
public class PRPoundsController {

    @Autowired
    PoundsService poundsService;
    @Autowired
    ClientService clientService;
    @Autowired
    InboundService inboundService;

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalPoundsRecord")
    @ResponseBody
    public int totalPoundsRecord() {
        try {
            return poundsService.count();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @RequestMapping("loadPagePoundsList")
    @ResponseBody
    public String loadPagePoundsList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 取出查询客户
            List<Pounds> poundsList = poundsService.listPage(page);
            // 计算最后页位置
            JSONArray array = JSONArray.fromArray(poundsList.toArray(new Pounds[poundsList.size()]));
            res.put("data", array);
            res.put("status", "success");
            res.put("message", "分页数据获取成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "分页数据获取失败！");
        }
        // 返回结果
        return res.toString();
    }

    @RequestMapping("getPounds")
    @ResponseBody
    public String getWayBill(String id) {
        JSONObject res = new JSONObject();
        try {
            //根据id查询出相应的对象信息
            Pounds pounds = poundsService.getById(id);
            //新建一个对象并给它赋值为wayBill
            JSONObject data = JSONObject.fromBean(pounds);
            res.put("data", data);
            res.put("status", "success");
            res.put("message", "获取数据成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取数据失败");
        }
        return res.toString();
    }

    /**
     * 获取目前的磅单编号
     *
     * @return
     */
    @RequestMapping("getCurrentPoundsId")
    @ResponseBody
    public String getCurrentWayBillId() {
        String id = poundsService.getCurrentPoundsId();
        JSONObject res = new JSONObject();
        res.put("id", id);
        return res.toString();
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importPoundsExcel")
    @ResponseBody
    public String importPoundsExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);

            for (int i = 1; i < data.length; i++) {
                Pounds pounds = new Pounds();
                pounds.setId(poundsService.getCurrentPoundsId());
                pounds.setTransferId(data[i][0].toString());
                // 入库车牌
                pounds.setEnterLicencePlate(data[i][1].toString());
                // 出库车牌
                pounds.setOutLicencePlate(data[i][1].toString());
                pounds.setGoodsName(data[i][2].toString());
                pounds.setWastesCode(data[i][3].toString());
                // 毛重
                pounds.setGrossWeight(Float.parseFloat(data[i][4].toString()));
                // 皮重
                pounds.setTare(Float.parseFloat(data[i][5].toString()));
                // 净重
                pounds.setNetWeight(Float.parseFloat(data[i][6].toString()));
                // 发货单位
                Client deliveryCompany = null;
                deliveryCompany = clientService.getByName(data[i][7].toString());
                if (deliveryCompany == null) {
                    deliveryCompany = new Client();
                    deliveryCompany.setCompanyName(data[i][7].toString());
                    deliveryCompany.setClientId(clientService.getCurrentId());
                    clientService.add(deliveryCompany);
                }
                pounds.setDeliveryCompany(deliveryCompany);
                // 收货单位
                Client receiveCompany = null;
                receiveCompany = clientService.getByName(data[i][8].toString());
                if (receiveCompany == null) {
                    receiveCompany = new Client();
                    receiveCompany.setCompanyName(data[i][8].toString());
                    receiveCompany.setClientId(clientService.getCurrentId());
                    clientService.add(receiveCompany);
                }
                pounds.setReceiveCompany(receiveCompany);
                // 业务类型
                pounds.setBusinessType(data[i][9].toString());
                pounds.setEnterTime(DateUtil.getDateTimeFromStr(data[i][10].toString()));
                pounds.setOutTime(DateUtil.getDateTimeFromStr(data[i][11].toString()));
                pounds.setDriver(data[i][12].toString());
                pounds.setWeighman(data[i][13].toString());
                pounds.setRemarks(data[i][14].toString().equals("null") ? null : data[i][14].toString());
                pounds.setFounder(data[i][15].toString());
                pounds.setCreationDate(new Date());
//                Pounds pounds1 = poundsService.getByTransferId(pounds.getTransferId());
//                if (pounds1 != null) {
//                    NumberFormat nf = NumberFormat.getInstance();
//                    //设置是否使用分组
//                    nf.setGroupingUsed(false);
//                    //设置最大整数位数
//                    nf.setMaximumIntegerDigits(4);
//                    //设置最小整数位数
//                    nf.setMinimumIntegerDigits(4);
//                    int index = Integer.parseInt(pounds.getTransferId());
//                    // 获取唯一的编号
//                    do {
//                        index += 1;
//                        pounds.setTransferId(nf.format(index));
//                    } while (poundsService.getByTransferId(pounds.getTransferId()) != null);
//                }

                // update 2018-11-05 17:25:14 by Lu
//                =====================================================
                // 根据转移联单号更新入库计划单的磅单数量
                InboundPlanOrder inboundPlanOrder = new InboundPlanOrder();
                inboundPlanOrder.setPoundsCount(pounds.getNetWeight());
                inboundPlanOrder.setTransferDraftId(pounds.getTransferId());
                inboundService.updateInboundPlanPounds(inboundPlanOrder);
//                =====================================================
                poundsService.add(pounds);
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    @RequestMapping("getPoundsSeniorSelectedList")
    @ResponseBody
    public String getPoundsSeniorSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        CheckState[] states = new CheckState[]{CheckState.NewBuild,CheckState.Confirm, CheckState.Invalid};
        JSONArray stateList = JSONArray.fromArray(states);
        res.put("stateList", stateList);
        return res.toString();
    }

    @RequestMapping("searchPoundsTotal")
    @ResponseBody
    public int searchWayBillTotal(@RequestBody Pounds pounds) {
        try {
            return poundsService.searchCount(pounds);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param pounds
     * @return
     */
    @RequestMapping("searchPounds")
    @ResponseBody
    public String searchSampleInfo(@RequestBody Pounds pounds) {
        JSONObject res = new JSONObject();
        try {
            List<Pounds> poundsList = poundsService.search(pounds);
            JSONArray data = JSONArray.fromArray(poundsList.toArray(new Pounds[poundsList.size()]));
            System.out.println(data);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    @RequestMapping("invalidPounds")
    @ResponseBody
    public String invalidPounds(String id) {
        JSONObject res = new JSONObject();
        try {
            poundsService.invalid(id);
            res.put("status", "success");
            res.put("message", "作废成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "作废失败！");
        }
        return res.toString();
    }

    @RequestMapping("printTime")
    @ResponseBody
    public String printTime(String id) {
        JSONObject res = new JSONObject();
        try {
            poundsService.printTime(id);
            res.put("status", "success");
            res.put("message", "打印时间更新成功！");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "打印时间更新失败！");
        }
        return res.toString();
    }

    @RequestMapping("exportPoundsExcel")
    @ResponseBody
    public String exportPoundsExcel(HttpServletResponse response) {
        JSONObject res = new JSONObject();
        try {
            List<Pounds> poundsList = poundsService.list();
            //对象个数，加上一行表头
            int row = poundsList.size() + 1;
            //单个对象需要导出的属性个数，手动输入
            int col = 20;
            //表格名称，手动输入
            String name = "Pounds";
            String[][] data = new String[row][col];
            //将list中数据装入数组data,并设置表头
            data[0][0] = "磅单号";
            data[0][1] = "转移联单号";
            data[0][2] = "入厂车牌号";
            data[0][3] = "货物名称";
            data[0][4] = "毛重（千克）";
            data[0][5] = "净重（千克）";
            data[0][6] = "皮重（千克）";
            data[0][7] = "发货单位";
            data[0][8] = "收货单位";
            data[0][9] = "业务类型";
            data[0][10] = "入厂时间";
            data[0][11] = "出厂时间";
            data[0][12] = "司机";
            data[0][13] = "司磅员";
            data[0][14] = "备注";
            data[0][15] = "出厂车牌号";
            data[0][16] = "磅单创建人";
            data[0][17] = "磅单创建时间";
            data[0][18] = "打印时间";
            data[0][19] = "磅单状态";
            //设置表体
            int i = 0;
            for (Pounds pounds : poundsList) {
                i++;
                data[i][0] = pounds.getId();
                data[i][1] = pounds.getTransferId();
                data[i][2] = pounds.getEnterLicencePlate();
                data[i][3] = pounds.getGoodsName();
                data[i][4] = pounds.getGrossWeight().toString();
                data[i][5] = pounds.getNetWeight().toString();
                data[i][6] = pounds.getTare().toString();
                data[i][7] = pounds.getDeliveryCompany().getCompanyName();
                data[i][8] = pounds.getReceiveCompany().getCompanyName();
                data[i][9] = pounds.getBusinessType();
                data[i][10] = getTimeSecondStr(pounds.getEnterTime());
                data[i][11] = getTimeSecondStr(pounds.getOutTime());
                data[i][12] = pounds.getDriver();
                data[i][13] = pounds.getWeighman();
                data[i][14] = pounds.getRemarks();
                data[i][15] = pounds.getOutLicencePlate();
                data[i][16] = pounds.getFounder();
                data[i][17] = getDateStr(pounds.getCreationDate());
                if(pounds.getPrintTime() != null) data[i][18] = getTimeSecondStr(pounds.getPrintTime());
                else data[i][18] = "";
                data[i][19] = pounds.getState().getName();
            }
//            for(int k = 0; k < row; k++){
//                System.out.println();
//                for(int j = 0; j < col; j++){
//                    System.out.print(data[k][j] + ',');
//                }
//            }
            // 创建Excel表。
            org.apache.poi.ss.usermodel.Workbook book = new HSSFWorkbook();
            // 在当前Excel创建一个子表,并命名为name
            org.apache.poi.ss.usermodel.Sheet sheet = book.createSheet(name);
            for (int k = 0; k < row; k++) {
                //在excel中创建一个空行
                Row rowData = sheet.createRow(k);
                System.out.println();
                //给空行赋值
                for (int j = 0; j < col; j++) {
                    //创建单元格
                    org.apache.poi.ss.usermodel.Cell cell = rowData.createCell(k);
                    //赋值
                    cell.setCellValue(data[k][j]);
                    System.out.print(cell + ",");
                }
            }
            // 保存
            ByteArrayOutputStream fos = null;
            try {
                fos = new ByteArrayOutputStream();
                book.write(fos);
            } finally {
                try {
                    fos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            OutputStream os = response.getOutputStream();
            String file = name;//初始文件名
            //为了让各种浏览器可以识别,需要将中文转换成Byte形式,然后通过ISO-8859-1进行编码
            name = new String(file.getBytes("iso8859-1"), "utf-8");
            response.reset();
            //设置content-disposition响应头控制浏览器以下载的形式打开文件
            //报头用于提供一个推荐的文件名，并强制浏览器显示保存对话框
            //attachment表示以附件方式下载。如果要在页面中打开，则改为 inline
            //name.xls要保存的文件名
            response.setHeader("Content-Disposition", "attachment; filename=" + name + ".xls");
            response.setContentType("application/octet-stream; charset=utf-8");
            book.write(os);
            os.flush();
            if (os != null) {
                try {
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
//            ByteArrayOutputStream os = new ByteArrayOutputStream();
//            byte[] content = os.toByteArray();
//            InputStream is = new ByteArrayInputStream(content);
//            String fileName = name ;
//            response.reset();
//            response.setContentType("application/vnd.ms-excel;charset=utf-8");
//            response.setHeader("Content-Disposition", "attachment;filename="+ new String((fileName + ".xls").getBytes(), "iso-8859-1"));
//            ServletOutputStream out = response.getOutputStream();
//            BufferedInputStream bis = null;
//            BufferedOutputStream bos = null;
//            try {
//                bis = new BufferedInputStream(is);
//                bos = new BufferedOutputStream(out);
//                byte[] buff = new byte[2048];
//                int bytesRead;
//                // Simple read/write loop.
//                while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
//                    bos.write(buff, 0, bytesRead);
//                }
//            } catch (final IOException e) {
//                throw e;
//            } finally {
//                if (bis != null)
//                    bis.close();
//                if (bos != null)
//                    bos.close();
//            }
            res.put("status", "success");
            res.put("message", "导出成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导出失败!");
        }
        return res.toString();
    }

    @RequestMapping("resetPrintTime")
    @ResponseBody
    public String resetPrintTime(String id){
        JSONObject res = new JSONObject();
        try{
            poundsService.printTime(id);
            res.put("status","success");
            res.put("message","清零打印时间成功！");
        }catch (Exception e){
            res.put("status","fail");
            res.put("message","清零打印时间失败！");
        }
        return res.toString();
    }

    @RequestMapping("addPounds")
    @ResponseBody
    public String addPounds(@RequestBody Pounds pounds){
        JSONObject res = new JSONObject();
        try{
            poundsService.add(pounds);
            res.put("status","success");
            res.put("message","新增成功！");
        }catch (Exception e){
            res.put("status","fail");
            res.put("message","新增失败！");
        }
        return res.toString();
    }


}

