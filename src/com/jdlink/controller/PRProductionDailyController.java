package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.SewagePointItem;
import com.jdlink.domain.Dictionary.SoftPointItem;
import com.jdlink.domain.Produce.*;
import com.jdlink.service.ProductionDailyService;
import com.jdlink.service.dictionary.DictionaryService;
import com.jdlink.service.produce.SewageTestService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.Map;
@Controller
public class PRProductionDailyController {

    @Autowired
    ProductionDailyService productionDailyService;
    @Autowired
    SewageTestService sewageTestService;
    @Autowired
    DictionaryService dictionaryService;

    //////污水分析日报////
    @RequestMapping("loadPageSewageList")
    @ResponseBody
    public String loadPageSewageList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Sewageregistration> sewageList = productionDailyService.sewageList(page);
            JSONArray data = JSONArray.fromArray(sewageList.toArray(new Sewageregistration[sewageList.size()]));
            res.put("data", data);
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

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalSewageRecord")
    @ResponseBody
    public int totalSewageRecord() {
        try {
            return productionDailyService.countSewage();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSewageExcel")
    @ResponseBody
    public String importSewageExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            System.out.println("数据如下：");
            for (int i = 1; i < data.length; i++) {
                for (int j = 0; j < data[0].length; j++) {
                    System.out.print(data[i][j].toString());
                    System.out.print(",");
                }
                System.out.println();
            }
            for (int i = 1; i < data.length; i++) {
                Sewage sewage = new Sewage();
                sewage.setName(data[i][1].toString());
                sewage.setReceiveDate(DateUtil.getDateFromStr(data[i][2].toString()));
                sewage.setCod(Float.parseFloat(data[i][3].toString()));
                sewage.setBod5(Float.parseFloat(data[i][4].toString()));
                sewage.setOxygen(Float.parseFloat(data[i][5].toString()));
                sewage.setNitrogen(Float.parseFloat(data[i][6].toString()));
                sewage.setLye(Float.parseFloat(data[i][7].toString()));
                sewage.setPh(Float.parseFloat(data[i][8].toString()));
                sewage.setRemarks(data[i][9].toString());
                productionDailyService.addSewage(sewage);
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

    /**
     * 获取查询总数
     *
     * @param
     * @return
     */
    @RequestMapping("searchSewageTotal")
    @ResponseBody
    public int searchSewageTotal(@RequestBody Sewageregistration sewageregistration) {
        try {
            return productionDailyService.searchCountSewage(sewageregistration);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param sewageregistration
     * @return
     */
    @RequestMapping("searchSewage")
    @ResponseBody
    public String search(@RequestBody Sewageregistration sewageregistration) {
        JSONObject res = new JSONObject();
        try {
            List<Sewageregistration> sewageList = productionDailyService.searchSewage(sewageregistration);
            //JSONArray data = JSONArray.fromArray(sewageList.toArray(new Sewage[sewageList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sewageList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }

    //////软水分析日报////
    @RequestMapping("loadPageSoftWaterList")
    @ResponseBody
    public String loadPageSoftWaterList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            List<Sewageregistration> softWaterList = productionDailyService.softList(page);
            // JSONArray data = JSONArray.fromArray(softWaterList.toArray(new SoftWater[softWaterList.size()]));
            res.put("data", softWaterList);
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

    /**
     * 获取总记录数
     *
     * @return
     */
    @RequestMapping("totalSoftWaterRecord")
    @ResponseBody
    public int totalSoftWaterRecord() {
        try {
            return productionDailyService.countSoftWater();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

//    /**
//     * 导入
//     *
//     * @param excelFile
//     * @return
//     */
//    @RequestMapping("importSoftWaterExcel")
//    @ResponseBody
//    public String importSoftWaterExcel(MultipartFile excelFile) {
//        JSONObject res = new JSONObject();
//        try {
//            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
//            System.out.println("数据如下：");
//            for (int i = 1; i < data.length; i++) {
//                for (int j = 0; j < data[0].length; j++) {
//                    System.out.print(data[i][j].toString());
//                    System.out.print(",");
//                }
//                System.out.println();
//            }
//            for (int i = 1; i < data.length; i++) {
//                SoftWater softWater = new SoftWater();
//                softWater.setName(data[i][1].toString());
//                softWater.setReceiveDate(DateUtil.getDateFromStr(data[i][2].toString()));
//                softWater.setRelativeAlkalinity(Float.parseFloat(data[i][3].toString()));
//                softWater.setDissolvedSolidForm(Float.parseFloat(data[i][4].toString()));
//                softWater.setPh(Float.parseFloat(data[i][5].toString()));
//                softWater.setAlkalinity(Float.parseFloat(data[i][6].toString()));
//                softWater.setHardness(Float.parseFloat(data[i][7].toString()));
//                softWater.setElectricalConductivity(Float.parseFloat(data[i][8].toString()));
//                softWater.setRemarks(data[i][9].toString());
//                productionDailyService.addSoftWater(softWater);
//            }
//            res.put("status", "success");
//            res.put("message", "导入成功");
//        } catch (Exception e) {
//            e.printStackTrace();
//            res.put("status", "fail");
//            res.put("message", "导入失败，请重试！");
//        }
//        return res.toString();
//    }

    /**
     * 获取查询总数
     *
     * @param
     * @return
     */
    @RequestMapping("searchSoftWaterTotal")
    @ResponseBody
    public int searchSoftWaterTotal(@RequestBody Sewageregistration sewageregistration) {
        try {
            return productionDailyService.searchCountSoftWater(sewageregistration);
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询功能
     *
     * @param
     * @return
     */
    @RequestMapping("searchSoftWater")
    @ResponseBody
    public String searchSoftWater(@RequestBody Sewageregistration sewageregistration) {
        JSONObject res = new JSONObject();
        try {
            List<Sewageregistration> softWaterList = productionDailyService.searchSoftWater(sewageregistration);
            // JSONArray data = JSONArray.fromArray(softWaterList.toArray(new SoftWater[softWaterList.size()]));
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", softWaterList);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");
        }
        return res.toString();
    }


    //添加污水登记主表
    @RequestMapping("addSewaGeregistration")
    @ResponseBody
    public String addSewaGeregistration(@RequestBody Sewageregistration sewageregistration) {
        JSONObject res = new JSONObject();

        try {
            // 生成预约号
//            Date date = new Date();   //获取当前时间
//            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
//            String prefix = simpleDateFormat.format(date) + sewageregistration.getClient().getClientId();
//            System.out.println("前缀"+prefix);
//            int count =productionDailyService.countByIdSew(prefix) + 1;
//            String suffix;
//            if (count <= 9) suffix = "0" + count;
//            else suffix = count + "";
//            String id = RandomUtil.getAppointId(prefix, suffix);
//            // 确保编号唯一
//            while (productionDailyService.getSewaGeregistrationById(id) != null) {
//                int index = Integer.parseInt(id);
//                index += 1;
//                id =String.valueOf(index);
//            }
//            sewageregistration.setId(id);
            productionDailyService.addSewaGeregistration(sewageregistration);
            res.put("status", "success");
            res.put("message", "添加主表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "添加主表失败");

        }

        return res.toString();

    }


    //添加污水登记子表
    @RequestMapping("addSewaGeregistrationItem")
    @ResponseBody
    public String addSewaGeregistrationItem(@RequestBody SewageregistrationItem sewageregistrationItem) {
        JSONObject res = new JSONObject();

        try {
            String id1;
            int index = productionDailyService.wastesCountById(sewageregistrationItem.getSampleinformationId());
            do {
                index += 1;
                String index1 = index + "";
                if (index < 10) index1 = "000" + index;
                else if (index < 100) index1 = "00" + index;
                else if (index < 1000) index1 = "0" + index;
                id1 = sewageregistrationItem.getSampleinformationId() + index1;
            } while (productionDailyService.getByWastesId(id1) != null);
            sewageregistrationItem.setId(id1);
            String id = productionDailyService.getNewestId().get(0);
            productionDailyService.addSewaGeregistrationItem(sewageregistrationItem);
            res.put("status", "success");
            res.put("message", "字表添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");

        }

        return res.toString();


    }

    //添加软水登记主表
    @RequestMapping("addSoftGeregistration")
    @ResponseBody
    public String addSoftGeregistration(@RequestBody Sewageregistration sewageregistration) {
        JSONObject res = new JSONObject();

        try {
            productionDailyService.addSoftGeregistration(sewageregistration);
            res.put("status", "success");
            res.put("message", "添加主表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "success");
            res.put("message", "添加主表失败");
        }

        return res.toString();


    }

    //添加软水登记子表
    @RequestMapping("addSoftGeregistrationItem")
    @ResponseBody
    public String addSoftGeregistrationItem(@RequestBody SewageregistrationItem sewageregistrationItem) {
        JSONObject res = new JSONObject();
        try {
            String id1;
            int index = productionDailyService.wastesCountByIdSoft(sewageregistrationItem.getSampleinformationId());
            do {
                index += 1;
                String index1 = index + "";
                if (index < 10) index1 = "000" + index;
                else if (index < 100) index1 = "00" + index;
                else if (index < 1000) index1 = "0" + index;
                id1 = sewageregistrationItem.getSampleinformationId() + index1;
            } while (productionDailyService.getByWastesId(id1) != null);
            sewageregistrationItem.setId(id1);
            String id = productionDailyService.getNewestId().get(0);
            productionDailyService.addSoftGeregistrationItem(sewageregistrationItem);
            res.put("status", "success");
            res.put("message", "字表添加成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "字表添加失败");

        }

        return res.toString();


    }

    //根据编号获取污水登记信息
    @RequestMapping("getSewaGeregistrationById")
    @ResponseBody
    public String getSewaGeregistrationById(String id) {
        JSONObject res = new JSONObject();
        System.out.println(id + "89");
        try {
            Sewageregistration sewageregistration = productionDailyService.getSewaGeregistrationById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sewageregistration);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
        return res.toString();


    }

    //根据编号获取软水登记信息
    @RequestMapping("getSoftGeregistrationById")
    @ResponseBody
    public String getSoftGeregistrationById(String id) {
        JSONObject res = new JSONObject();
        System.out.println(id + "89");
        try {
            Sewageregistration sewageregistration = productionDailyService.getSoftGeregistrationById(id);
            res.put("status", "success");
            res.put("message", "查询成功");
            res.put("data", sewageregistration);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "查询失败");

        }
        return res.toString();


    }

    /**
     * 一键签收污水
     *
     * @return
     */
    @RequestMapping("confirmAllSewageAnalysisCheck")
    @ResponseBody
    public String confirmAllSewageAnalysisCheck(@RequestBody Sewageregistration sewageregistration1) {
        JSONObject res = new JSONObject();
        try {
            // 改变单据状态
            productionDailyService.confirmAllSewageAnalysisCheck(sewageregistration1);
            if(sewageregistration1.getSampleIdList().size() > 0){
                for (String id : sewageregistration1.getSampleIdList()) {
                    //获取样品单号
                    Sewageregistration sewageregistration = productionDailyService.getSewaGeregistrationById(id);
                    SewageregistrationItem sewageregistrationItem = sewageregistration.getSewageregistrationItemList().get(0);
                    SewageTest sewageTest = new SewageTest();
                    sewageTest.setId(id);
                    sewageTest.setAddress(sewageregistration.getSewagePointItem().getDictionaryItemName());
                    if (sewageregistrationItem.getCod() == 1) {
                        sewageTest.setCOD(0);
                    } else {
                        sewageTest.setCOD(-9999);
                    }
                    if (sewageregistrationItem.getPh() == 1) {
                        sewageTest.setPh(0);
                    } else {
                        sewageTest.setPh(-9999);
                    }
                    if (sewageregistrationItem.getBod5() == 1) {
                        sewageTest.setBOD5(0);
                    } else {
                        sewageTest.setBOD5(-9999);
                    }
                    if (sewageregistrationItem.getBod5() == 1) {
                        sewageTest.setBOD5(0);
                    } else {
                        sewageTest.setBOD5(-9999);
                    }
                    if (sewageregistrationItem.getN2() == 1) {
                        sewageTest.setN2(0);
                    } else {
                        sewageTest.setN2(-9999);
                    }
                    if (sewageregistrationItem.getNitrogen() == 1) {
                        sewageTest.setNitrogen(0);
                    } else {
                        sewageTest.setNitrogen(-9999);
                    }
                    if (sewageregistrationItem.getPhosphorus() == 1) {
                        sewageTest.setPhosphorus(0);
                    } else {
                        sewageTest.setPhosphorus(-9999);
                    }
                    sewageTest.setAlkalinity(-9999);
                    sewageTest.setAlkalinityCaCo3(-9999);
                    sewageTest.setAlkalinityHCO3(-9999);
                    sewageTest.setBicarbonate(-9999);
                    sewageTest.setBicarbonateCaCo3(-9999);
                    sewageTest.setBicarbonateHCO3(-9999);
                    if (sewageTestService.getSewageTestById(id) == null) {
                        sewageTestService.addSewageTest(sewageTest);
                    } else {
//                        productionDailyService.updateSampleTest(sewageTest);
                    }
                }
                res.put("status", "success");
                res.put("message", "收样成功");
            }else {
                res.put("status", "success");
                res.put("message", "请勾选需要签收的单据");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");
        }
        return res.toString();
    }

    //确认送样==》污水
    @RequestMapping("confirmSewaGeregistrationById")
    @ResponseBody
    public String confirmSewaGeregistrationById(String id, String laboratorySignatory) {
        JSONObject res = new JSONObject();
        try {
            productionDailyService.confirmSewaGeregistrationById(id, laboratorySignatory);
            //获取样品单号
            Sewageregistration sewageregistration = productionDailyService.getSewaGeregistrationById(id);
            SewageregistrationItem sewageregistrationItem = sewageregistration.getSewageregistrationItemList().get(0);
            SewageTest sewageTest = new SewageTest();
            sewageTest.setId(id);
            if(sewageregistration.getSewagePointItem()!=null){
                sewageTest.setAddress(sewageregistration.getSewagePointItem().getDictionaryItemName());
            }
            if (sewageregistrationItem.getCod() == 1) {
                sewageTest.setCOD(0);
            } else {
                sewageTest.setCOD(-9999);
            }
            if (sewageregistrationItem.getPh() == 1) {
                sewageTest.setPh(0);
            } else {
                sewageTest.setPh(-9999);
            }
            if (sewageregistrationItem.getBod5() == 1) {
                sewageTest.setBOD5(0);
            } else {
                sewageTest.setBOD5(-9999);
            }
            if (sewageregistrationItem.getBod5() == 1) {
                sewageTest.setBOD5(0);
            } else {
                sewageTest.setBOD5(-9999);
            }
            if (sewageregistrationItem.getN2() == 1) {
                sewageTest.setN2(0);
            } else {
                sewageTest.setN2(-9999);
            }
            if (sewageregistrationItem.getNitrogen() == 1) {
                sewageTest.setNitrogen(0);
            } else {
                sewageTest.setNitrogen(-9999);
            }
            if (sewageregistrationItem.getPhosphorus() == 1) {
                sewageTest.setPhosphorus(0);
            } else {
                sewageTest.setPhosphorus(-9999);
            }
            sewageTest.setAlkalinity(-9999);
            sewageTest.setAlkalinityCaCo3(-9999);
            sewageTest.setAlkalinityHCO3(-9999);
            sewageTest.setBicarbonate(-9999);
            sewageTest.setBicarbonateCaCo3(-9999);
            sewageTest.setBicarbonateHCO3(-9999);
            if (sewageTestService.getSewageTestById(id) == null) {
                sewageTestService.addSewageTest(sewageTest);
            }
            else {
//                productionDailyService.updateSampleTest(sewageTest);
            }
            res.put("status", "success");
            res.put("message", "收样成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");
        }
        return res.toString();
    }

    /**
     * 一键签收功能 软水
     * @param sewageregistration1
     * @return
     */
    @RequestMapping("confirmAllSoftWaterAnalysisCheck")
    @ResponseBody
    public String confirmAllSoftWaterCheck(@RequestBody Sewageregistration sewageregistration1) {
        JSONObject res = new JSONObject();
        try {
            // 改变单据状态
            productionDailyService.confirmAllSoftWaterCheck(sewageregistration1);
            if(sewageregistration1.getSampleIdList().size() > 0) {
                for (String id : sewageregistration1.getSampleIdList()) {
                    //获取样品单号
                    Sewageregistration sewageregistration = productionDailyService.getSoftGeregistrationById(id);
                    SewageregistrationItem sewageregistrationItem = sewageregistration.getSewageregistrationItemList().get(0);
                    System.out.println("软水样品情况:" + sewageregistrationItem);
                    SoftTest softTest = new SoftTest();
                    softTest.setId(id);
                    softTest.setAddress(sewageregistration.getSoftPointItem().getDictionaryItemName());
                    if (sewageregistrationItem.getPh() == 1) {
                        softTest.setPH(0);
                    } else {
                        softTest.setPH(-9999);
                    }
                    if (sewageregistrationItem.getElectricalConductivity() == 1) {
                        softTest.setElectricalConductivity(0);
                    } else {
                        softTest.setElectricalConductivity(-9999);
                    }
                    if (sewageregistrationItem.getHardness() == 1) {
                        softTest.setHardness("0");
                    } else {
                        softTest.setHardness("-9999");
                    }
                    if (sewageregistrationItem.getTurbidity() == 1) {
                        softTest.setTurbidity(0);
                    } else {
                        softTest.setTurbidity(-9999);
                    }
                    if (sewageregistrationItem.getBasicity() == 1) {
                        softTest.setBasicity(0);
                    } else {
                        softTest.setBasicity(-9999);
                    }
                    if (sewageregistrationItem.getPhenolphthalein() == 1) {
                        softTest.setPhenolphthalein(0);
                    } else {
                        softTest.setPhenolphthalein(-9999);
                    }
                    if (sewageTestService.getSoftTestById(id) == null) {
                        sewageTestService.addSoftTest(softTest);
                    } else {
//                        productionDailyService.updateSampleSoftTest(softTest);
                    }
                }
                res.put("status", "success");
                res.put("message", "收样成功");
            } else {
                res.put("status", "success");
                res.put("message", "请勾选需要签收的单据！");
            }
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");
        }
        return res.toString();
    }

    //确认送样==》软水
    @RequestMapping("confirmSoftGeregistrationById")
    @ResponseBody
    public String confirmSoftGeregistrationById(String id, String laboratorySignatory) {
        JSONObject res = new JSONObject();
        try {
            productionDailyService.confirmSoftGeregistrationById(id, laboratorySignatory);
            //获取样品单号
            Sewageregistration sewageregistration = productionDailyService.getSoftGeregistrationById(id);

            SewageregistrationItem sewageregistrationItem = sewageregistration.getSewageregistrationItemList().get(0);
            System.out.println("软水样品情况:" + sewageregistrationItem);

            SoftTest softTest = new SoftTest();
            softTest.setId(id);
            softTest.setAddress(sewageregistration.getSoftPointItem().getDictionaryItemName());
            if (sewageregistrationItem.getPh() == 1) {
                softTest.setPH(0);
            } else {
                softTest.setPH(-9999);
            }
            if (sewageregistrationItem.getElectricalConductivity() == 1) {
                softTest.setElectricalConductivity(0);
            } else {
                softTest.setElectricalConductivity(-9999);
            }
            if (sewageregistrationItem.getHardness() == 1) {
                softTest.setHardness("0");
            } else {
                softTest.setHardness("-9999");
            }
            if (sewageregistrationItem.getTurbidity() == 1) {
                softTest.setTurbidity(0);
            } else {
                softTest.setTurbidity(-9999);
            }
            if (sewageregistrationItem.getBasicity() == 1) {
                softTest.setBasicity(0);
            } else {
                softTest.setBasicity(-9999);
            }
            if (sewageregistrationItem.getPhenolphthalein() == 1) {
                softTest.setPhenolphthalein(0);
            } else {
                softTest.setPhenolphthalein(-9999);
            }

            if (sewageTestService.getSoftTestById(id) == null) {
                sewageTestService.addSoftTest(softTest);
            } else {
//                productionDailyService.updateSampleSoftTest(softTest);
            }


            res.put("status", "success");
            res.put("message", "收样成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "收样失败");

        }

        return res.toString();


    }

    //拒收污水
    @RequestMapping("rejectSewaGeregistrationById")
    @ResponseBody
    public String rejectSewaGeregistrationById(String id, String advice) {
        JSONObject res = new JSONObject();
        try {
            productionDailyService.rejectSewaGeregistrationById(id, advice);
            res.put("status", "success");
            res.put("message", "已拒收");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "拒收失败");
        }

        return res.toString();
    }

    //拒收软水
    @RequestMapping("rejectSoftGeregistrationById")
    @ResponseBody
    public String rejectSoftGeregistrationById(String id, String advice) {
        JSONObject res = new JSONObject();
        try {
            productionDailyService.rejectSoftGeregistrationById(id, advice);
            res.put("status", "success");
            res.put("message", "已拒收");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "拒收失败");
        }

        return res.toString();
    }

    /**
     * 污水导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSampleSewageExcel")
    @ResponseBody
    public String importSampleSewageExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);

            Map<String, Sewageregistration> map = new HashMap<>();
            List<SewageregistrationItem> sewageregistrationItemArrayList = new ArrayList<>();
            String id1 = "";
            for (int i = 2; i < data.length; i++) {
                String id = data[i][0].toString();
                // update 2018年12月29日 by ljc 非空判断
                if (id.equals("null")) continue;
                SewageregistrationItem sewageregistrationItem = new SewageregistrationItem();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new Sewageregistration());
                    map.get(id).setId(id);
                    map.get(id).setSendingPerson(data[i][1].toString());
                    SewagePointItem sewagePointItem = new SewagePointItem();
                    int dataDictionaryItemId = dictionaryService.getdatadictionaryitemIdByName(data[i][2].toString(), 37);
                    sewagePointItem.setDataDictionaryItemId(dataDictionaryItemId);
                    map.get(id).setSewagePointItem(sewagePointItem);
                    map.get(id).setAddress(data[i][2].toString());
                    map.get(id).setWater(true); // 表明为污水数据
                    if(data[i][3].toString()!="null"){
                        map.get(id).setSampleTime(data[i][3].toString());
                    }
                    if(data[i][3].toString()=="null"){
                        map.get(id).setSampleTime("");
                    }

                    map.get(id).setCreationDate(DateUtil.getDateFromStr(data[i][10].toString()));
                    //新存储一个id对象时，将以下两个累计数据清零
                    sewageregistrationItemArrayList = new ArrayList<>();
                    int index = productionDailyService.wastesCountById(id);  // 设置危废ID
                    // 获取唯一的编号
                    do {
                        index += 1;
                        String index1 = index + "";
                        if (index < 10) index1 = "000" + index;
                        else if (index < 100) index1 = "00" + index;
                        else if (index < 1000) index1 = "0" + index;
                        id1 = id + index1;
                    } while (productionDailyService.getByWastesId(id) != null);
                } else {
                    int index1 = Integer.parseInt(id1.substring(id1.length() - 5)); // 截取ID后五位，然后叠加
                    String index2 = id1.substring(0, id1.length() - 5); // 截取ID前几位
                    index1++;
                    id1 = index2 + index1;  // 拼接ID
                }
                sewageregistrationItem.setId(id1);
                // 设置检测项目
                //PH
                if ((data[i][4].toString().equals("R") || data[i][4].toString().equals("1") || data[i][4].toString().equals("1.0")))
                    sewageregistrationItem.setPh(1);
                //COD
                if ((data[i][5].toString().equals("R") || data[i][5].toString().equals("1") || data[i][5].toString().equals("1.0")))
                    sewageregistrationItem.setCod(1);
                //氨氮
                if ((data[i][6].toString().equals("R") || data[i][6].toString().equals("1") || data[i][6].toString().equals("1.0")))
                    sewageregistrationItem.setN2(1);
                //碱度
                if ((data[i][7].toString().equals("R") || data[i][7].toString().equals("1") || data[i][7].toString().equals("1.0")))
                    sewageregistrationItem.setLye(1);
                //BOD5
                if ((data[i][8].toString().equals("R") || data[i][8].toString().equals("1") || data[i][8].toString().equals("1.0")))
                    sewageregistrationItem.setBod5(1);
                //总氮
                if ((data[i][9].toString().equals("R") || data[i][9].toString().equals("1") || data[i][9].toString().equals("1.0")))
                    sewageregistrationItem.setNitrogen(1);
                //总磷
                if ((data[i][10].toString().equals("R") || data[i][10].toString().equals("1") || data[i][10].toString().equals("1.0")))
                    sewageregistrationItem.setPhosphorus(1);
                sewageregistrationItem.setSampleinformationId(id);
                sewageregistrationItemArrayList.add(sewageregistrationItem);
                map.get(id).setSewageregistrationItemList(sewageregistrationItemArrayList);
            }
            for (String key : map.keySet()) {
                Sewageregistration sewageregistration1 = productionDailyService.getSewaGeregistrationById(map.get(key).getId());
                Sewageregistration sewageregistration = map.get(key);
                if (sewageregistration1 == null) {
                    //插入新数据
                    productionDailyService.addSewaGeregistration(sewageregistration);
                    for (SewageregistrationItem sewageregistrationItem : sewageregistration.getSewageregistrationItemList())
                        productionDailyService.addSewaGeregistrationItem(sewageregistrationItem);

                } else {
                    productionDailyService.updateSewaGeregistration(sewageregistration);
//                    throw new DuplicateKeyException("预约单号重复，请检查后导入");
                    for (SewageregistrationItem sewageregistrationItem : sewageregistration.getSewageregistrationItemList())
                        productionDailyService.updateSewaGeregistrationItem(sewageregistrationItem);

                }
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (DuplicateKeyException e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "预约单号重复，请检查后导入");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请重试！");
        }
        return res.toString();
    }

    /**
     * 软水导入
     *
     * @param excelFile
     * @return
     */
    @RequestMapping("importSampleSoftWaterExcel")
    @ResponseBody
    public String importSampleSoftWaterExcel(MultipartFile excelFile) {
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile).get(0);
            {
                System.out.println("数据如下：");
                for (int i = 2; i < data.length; i++) {
                    for (int j = 0; j < data[1].length; j++) {
                        System.out.print(data[i][j].toString());
                        System.out.print(",");
                    }
                    System.out.println();
                }
            }
            Map<String, Sewageregistration> map = new HashMap<>();
            List<SewageregistrationItem> sewageregistrationItemArrayList = new ArrayList<>();
            String id1 = "";
            for (int i = 2; i < data.length; i++) {
                String id = data[i][0].toString();
                SewageregistrationItem sewageregistrationItem = new SewageregistrationItem();
                //map内不存在即添加公共数据，存在即添加List内数据
                if (!map.keySet().contains(id)) {
                    map.put(id, new Sewageregistration());
                    map.get(id).setId(id);
                    map.get(id).setSendingPerson(data[i][1].toString());
                    SoftPointItem softPointItem = new SoftPointItem();
                    int dataDictionaryItemId = dictionaryService.getdatadictionaryitemIdByName(data[i][2].toString(), 38);
                    softPointItem.setDataDictionaryItemId(dataDictionaryItemId);
                    map.get(id).setSoftPointItem(softPointItem);
                    map.get(id).setAddress(data[i][2].toString());
                    map.get(id).setWater(false); // 表明为污水数据
                    map.get(id).setCreationDate(DateUtil.getDateFromStr(data[i][9].toString()));
                    //新存储一个id对象时，将以下两个累计数据清零
                    sewageregistrationItemArrayList = new ArrayList<>();
                    int index = productionDailyService.wastesCountById(id);  // 设置危废ID
                    // 获取唯一的编号
                    do {
                        index += 1;
                        String index1 = index + "";
                        if (index < 10) index1 = "000" + index;
                        else if (index < 100) index1 = "00" + index;
                        else if (index < 1000) index1 = "0" + index;
                        id1 = id + index1;
                    } while (productionDailyService.getByWastesId(id) != null);
                } else {
                    int index1 = Integer.parseInt(id1.substring(id1.length() - 5)); // 截取ID后五位，然后叠加
                    String index2 = id1.substring(0, id1.length() - 5); // 截取ID前几位
                    index1++;
                    id1 = index2 + index1;  // 拼接ID
                }
                sewageregistrationItem.setId(id1);
                // 设置检测项目
                if ((data[i][3].toString().equals("R") || data[i][3].toString().equals("1") || data[i][3].toString().equals("1.0")))
                    sewageregistrationItem.setTurbidity(1);
                if ((data[i][4].toString().equals("R") || data[i][4].toString().equals("1") || data[i][4].toString().equals("1.0")))
                    sewageregistrationItem.setHardness(1);
                if ((data[i][5].toString().equals("R") || data[i][5].toString().equals("1") || data[i][5].toString().equals("1.0")))
                    sewageregistrationItem.setPh(1);
                if ((data[i][6].toString().equals("R") || data[i][6].toString().equals("1") || data[i][6].toString().equals("1.0")))
                    sewageregistrationItem.setPhenolphthalein(1);
                if ((data[i][7].toString().equals("R") || data[i][7].toString().equals("1") || data[i][7].toString().equals("1.0")))
                    sewageregistrationItem.setBasicity(1);
                if ((data[i][8].toString().equals("R") || data[i][8].toString().equals("1") || data[i][8].toString().equals("1.0")))
                    sewageregistrationItem.setElectricalConductivity(1);
                sewageregistrationItem.setSampleinformationId(id);
                sewageregistrationItemArrayList.add(sewageregistrationItem);
                map.get(id).setSewageregistrationItemList(sewageregistrationItemArrayList);
            }
            for (String key : map.keySet()) {
                Sewageregistration sewageregistration1 = productionDailyService.getSoftGeregistrationById(map.get(key).getId());
                Sewageregistration sewageregistration = map.get(key);
                if (sewageregistration1 == null) {
                    //插入新数据
                    productionDailyService.addSoftGeregistration(sewageregistration);
                    for (SewageregistrationItem sewageregistrationItem : sewageregistration.getSewageregistrationItemList())
                        productionDailyService.addSoftGeregistrationItem(sewageregistrationItem);
                } else {
                    productionDailyService.updateSoftGeregistration(sewageregistration);
                    productionDailyService.deleteSoftGeregistrationItem(sewageregistration.getId());   //删除子项
                    for (SewageregistrationItem sewageregistrationItem : sewageregistration.getSewageregistrationItemList())  // 重新添加
                        productionDailyService.addSoftGeregistrationItem(sewageregistrationItem);
                }
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




}
