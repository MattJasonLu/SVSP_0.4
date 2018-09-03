package com.jdlink.controller;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.LaboratoryTest;
import com.jdlink.service.ClientService;
import com.jdlink.service.LaboratoryTestService;
import com.jdlink.util.DateUtil;
import com.jdlink.util.ImportUtil;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.text.NumberFormat;
import java.util.List;

/**
 * 化验单控制器
 */
@Controller
public class LaboratoryTestController {

    /**
     * 化验单事务
     */
    @Autowired
    LaboratoryTestService laboratoryTestService;
    @Autowired
    ClientService clientService;

    /**
     * 获取化验单列表
     * @return 化验单列表
     */
    @RequestMapping("loadPageLaboratoryTestList")
    @ResponseBody
    public String loadPageLaboratoryTestList(@RequestBody Page page) {
        JSONObject res = new JSONObject();
        try {
            // 列出所有化验单对象，获取列表
            List<LaboratoryTest> laboratoryTestList = laboratoryTestService.list(page);
            JSONArray data = JSONArray.fromArray(laboratoryTestList.toArray(new LaboratoryTest[laboratoryTestList.size()]));
            res.put("status", "success");
            res.put("message", "获取信息成功");
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "获取信息失败");
        }
        return res.toString();
    }

    /**
     * 获取所有数据数量
     * @return 数据数量
     */
    @RequestMapping("totalLaboratoryTestRecord")
    @ResponseBody
    public int totalLaboratoryTestRecord(){
        try {
            return laboratoryTestService.count();
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 查询数据
     * @param laboratoryTest 参数
     * @return 查询到的数据
     */
    @RequestMapping("searchLaboratoryTest")
    @ResponseBody
    public String searchLaboratoryTest(@RequestBody LaboratoryTest laboratoryTest) {
        JSONObject res = new JSONObject();
        try {
            List<LaboratoryTest> laboratoryTestList = laboratoryTestService.search(laboratoryTest);
            JSONArray data = JSONArray.fromArray(laboratoryTestList.toArray(new LaboratoryTest[laboratoryTestList.size()]));
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

    /**
     * 查询数据的数量
     * @param laboratoryTest
     * @return
     */
    @RequestMapping("searchLaboratoryTestTotal")
    @ResponseBody
    public int searchLaboratoryTestTotal(@RequestBody LaboratoryTest laboratoryTest){
        try {
            return laboratoryTestService.searchCount(laboratoryTest);
        }catch(Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    /**
     * 导入excel文件来增加化验单
     * @param excelFile 化验单excel文件
     * @return 导入成功与否
     */
    @RequestMapping("importLaboratoryTestExcel")
    @ResponseBody
    public String importLaboratoryTestExcel(MultipartFile excelFile){
        JSONObject res = new JSONObject();
        try {
            Object[][] data = ImportUtil.getInstance().getExcelFileData(excelFile);
            // 化验单对象
            LaboratoryTest laboratoryTest = new LaboratoryTest();
            for (int i = 0; i < data.length; i++) {
                if (i == 2) {
                    // 创建客户对象
                    Client client = new Client();
                    client.setCompanyName(data[i][0].toString());
                    // 通过客户名称查询到客户，若不存在则添加，否则直接更新
                    Client oldClient = clientService.getByName(client.getCompanyName());
                    if (oldClient == null) {
                        client.setClientId(clientService.getCurrentId());
                        client.setLocation(data[i][1].toString());
                        client.setContactName(data[i][2].toString());
                        client.setPhone(data[i][3].toString());
                        client.setIndustry(data[i][4].toString());
                        client.setProduct(data[i][5].toString());
                        clientService.add(client);
                    } else {
                        client = oldClient;
                    }
                    // 化验单数据
                    laboratoryTest.setClient(client);
                    laboratoryTest.setRecord(data[i][6].toString());
                    laboratoryTest.setRecordDate(DateUtil.getDateFromStr(data[i][7].toString()));
                    laboratoryTest.setLaboratory(data[i][8].toString());
                    laboratoryTest.setLaboratoryDate(DateUtil.getDateFromStr(data[i][9].toString()));
                    laboratoryTest.setLaboratoryCompany(data[i][10].toString());
                }
                if (i >= 2) {
                    laboratoryTest.setSamplingDate(DateUtil.getDateFromStr(data[i][11].toString()));
                    laboratoryTest.setWastesName(data[i][12].toString());
                    laboratoryTest.setWastesCode(data[i][13].toString());
                    laboratoryTest.setSamplingNumber(data[i][14].toString());
                    laboratoryTest.setLaboratoryDate(DateUtil.getDateFromStr(data[i][15].toString()));
                    laboratoryTest.setIsProductionLine(data[i][16] != null && data[i][16].toString().equals("√"));
                    laboratoryTest.setIsStorageArea(data[i][17] != null && data[i][17].toString().equals("√"));
                    // 粘度
                    if (data[i][18] != null || data[i][19] != null || data[i][20] != null) {
                        laboratoryTest.setIsViscosity(true);
                        laboratoryTest.setViscosityMinimum(Float.parseFloat(data[i][18].toString()));
                        laboratoryTest.setViscosityAverage(Float.parseFloat(data[i][19].toString()));
                        laboratoryTest.setViscosityMaximum(Float.parseFloat(data[i][20].toString()));
                    }
                    // 密度
                    if (data[i][21] != null || data[i][22] != null || data[i][23] != null) {
                        laboratoryTest.setIsDensity(true);
                        laboratoryTest.setDensityMinimum(Float.parseFloat(data[i][21].toString()));
                        laboratoryTest.setDensityAverage(Float.parseFloat(data[i][22].toString()));
                        laboratoryTest.setDensityMaximum(Float.parseFloat(data[i][23].toString()));
                    }
                    // 酸碱度
                    if (data[i][24] != null || data[i][25] != null || data[i][26] != null) {
                        laboratoryTest.setIsPH(true);
                        laboratoryTest.setPhMinimum(Float.parseFloat(data[i][24].toString()));
                        laboratoryTest.setPhAverage(Float.parseFloat(data[i][25].toString()));
                        laboratoryTest.setPhMaximum(Float.parseFloat(data[i][26].toString()));
                    }
                    // 热值
                    if (data[i][27] != null || data[i][28] != null || data[i][29] != null) {
                        laboratoryTest.setIsHeat(true);
                        laboratoryTest.setHeatMinimum(Float.parseFloat(data[i][27].toString()));
                        laboratoryTest.setHeatAverage(Float.parseFloat(data[i][28].toString()));
                        laboratoryTest.setHeatMaximum(Float.parseFloat(data[i][29].toString()));
                    }
                    // 灰分
                    if (data[i][30] != null || data[i][31] != null || data[i][32] != null) {
                        laboratoryTest.setIsAsh(true);
                        laboratoryTest.setAshMinimum(Float.parseFloat(data[i][30].toString()));
                        laboratoryTest.setAshAverage(Float.parseFloat(data[i][31].toString()));
                        laboratoryTest.setAshMaximum(Float.parseFloat(data[i][32].toString()));
                    }
                    // 闪点
                    if (data[i][33] != null || data[i][34] != null || data[i][35] != null) {
                        laboratoryTest.setIsFlashPoint(true);
                        laboratoryTest.setFlashPointMinimum(Float.parseFloat(data[i][33].toString()));
                        laboratoryTest.setFlashPointAverage(Float.parseFloat(data[i][34].toString()));
                        laboratoryTest.setFlashPointMaximum(Float.parseFloat(data[i][35].toString()));
                    }
                    // 熔点
                    if (data[i][36] != null || data[i][37] != null || data[i][38] != null) {
                        laboratoryTest.setIsMeltingPoint(true);
                        laboratoryTest.setMeltingPointMinimum(Float.parseFloat(data[i][36].toString()));
                        laboratoryTest.setMeltingPointAverage(Float.parseFloat(data[i][37].toString()));
                        laboratoryTest.setMeltingPointMaximum(Float.parseFloat(data[i][38].toString()));
                    }

                    // 含水率
                    if (data[i][39] != null || data[i][40] != null || data[i][41] != null) {
                        laboratoryTest.setIsWaterContent(true);
                        laboratoryTest.setWaterContentMinimum(Float.parseFloat(data[i][39].toString()));
                        laboratoryTest.setWaterContentAverage(Float.parseFloat(data[i][40].toString()));
                        laboratoryTest.setWaterContentMaximum(Float.parseFloat(data[i][41].toString()));
                    }
                    // 固体物质含量
                    if (data[i][42] != null || data[i][43] != null || data[i][44] != null) {
                        laboratoryTest.setIsSolidSubstanceContent(true);
                        laboratoryTest.setSolidSubstanceContentMinimum(Float.parseFloat(data[i][42].toString()));
                        laboratoryTest.setSolidSubstanceContentAverage(Float.parseFloat(data[i][43].toString()));
                        laboratoryTest.setSolidSubstanceContentMaximum(Float.parseFloat(data[i][44].toString()));
                    }
                    // 硫含量
                    if (data[i][45] != null || data[i][46] != null || data[i][47] != null) {
                        laboratoryTest.setIsSulfurContent(true);
                        laboratoryTest.setSulfurContentMinimum(Float.parseFloat(data[i][45].toString()));
                        laboratoryTest.setSulfurContentAverage(Float.parseFloat(data[i][46].toString()));
                        laboratoryTest.setSulfurContentMaximum(Float.parseFloat(data[i][47].toString()));
                    }
                    // 氯含量
                    if (data[i][48] != null || data[i][49] != null || data[i][50] != null) {
                        laboratoryTest.setIsChlorineContent(true);
                        laboratoryTest.setChlorineContentMinimum(Float.parseFloat(data[i][48].toString()));
                        laboratoryTest.setChlorineContentAverage(Float.parseFloat(data[i][49].toString()));
                        laboratoryTest.setChlorineContentMaximum(Float.parseFloat(data[i][50].toString()));
                    }
                    // 氟含量
                    if (data[i][51] != null || data[i][52] != null || data[i][53] != null) {
                        laboratoryTest.setIsFluorineContent(true);
                        laboratoryTest.setFluorineContentMinimum(Float.parseFloat(data[i][51].toString()));
                        laboratoryTest.setFluorineContentAverage(Float.parseFloat(data[i][52].toString()));
                        laboratoryTest.setFluorineContentMaximum(Float.parseFloat(data[i][53].toString()));
                    }
                    // 沸点
                    if (data[i][54] != null || data[i][55] != null || data[i][56] != null) {
                        laboratoryTest.setIsBoilingPoint(true);
                        laboratoryTest.setBoilingPointMinimum(Float.parseFloat(data[i][54].toString()));
                        laboratoryTest.setBoilingPointAverage(Float.parseFloat(data[i][55].toString()));
                        laboratoryTest.setBoilingPointMaximum(Float.parseFloat(data[i][56].toString()));
                    }
                    // 其他1
                    if (data[i][57] != null || data[i][58] != null || data[i][59] != null) {
                        laboratoryTest.setOtherParameter1("");
                        laboratoryTest.setParameter1Minimum(Float.parseFloat(data[i][57].toString()));
                        laboratoryTest.setParameter1Average(Float.parseFloat(data[i][58].toString()));
                        laboratoryTest.setParameter1Maximum(Float.parseFloat(data[i][59].toString()));
                    }
                    // 其他2
                    if (data[i][60] != null || data[i][61] != null || data[i][62] != null) {
                        laboratoryTest.setOtherParameter2("");
                        laboratoryTest.setParameter2Minimum(Float.parseFloat(data[i][60].toString()));
                        laboratoryTest.setParameter2Average(Float.parseFloat(data[i][61].toString()));
                        laboratoryTest.setParameter2Maximum(Float.parseFloat(data[i][62].toString()));
                    }
                    // 其他3
                    if (data[i][63] != null || data[i][64] != null || data[i][65] != null) {
                        laboratoryTest.setOtherParameter3("");
                        laboratoryTest.setParameter3Minimum(Float.parseFloat(data[i][63].toString()));
                        laboratoryTest.setParameter3Average(Float.parseFloat(data[i][64].toString()));
                        laboratoryTest.setParameter3Maximum(Float.parseFloat(data[i][65].toString()));
                    }
                    // Hg
                    if (data[i][66] != null || data[i][67] != null || data[i][68] != null) {
                        laboratoryTest.setIsHg(true);
                        laboratoryTest.setHgMinimum(Float.parseFloat(data[i][66].toString()));
                        laboratoryTest.setHgAverage(Float.parseFloat(data[i][67].toString()));
                        laboratoryTest.setHgMaximum(Float.parseFloat(data[i][68].toString()));
                    }
                    // Na
                    if (data[i][69] != null || data[i][70] != null || data[i][71] != null) {
                        laboratoryTest.setIsNa(true);
                        laboratoryTest.setNaMinimum(Float.parseFloat(data[i][69].toString()));
                        laboratoryTest.setNaAverage(Float.parseFloat(data[i][70].toString()));
                        laboratoryTest.setNaMaximum(Float.parseFloat(data[i][71].toString()));
                    }
                    // Cu
                    if (data[i][72] != null || data[i][73] != null || data[i][74] != null) {
                        laboratoryTest.setIsCu(true);
                        laboratoryTest.setCuMinimum(Float.parseFloat(data[i][72].toString()));
                        laboratoryTest.setCuAverage(Float.parseFloat(data[i][73].toString()));
                        laboratoryTest.setCuMaximum(Float.parseFloat(data[i][74].toString()));
                    }
                    // Ti
                    if (data[i][75] != null || data[i][76] != null || data[i][77] != null) {
                        laboratoryTest.setIsTi(true);
                        laboratoryTest.setTiMinimum(Float.parseFloat(data[i][75].toString()));
                        laboratoryTest.setTiAverage(Float.parseFloat(data[i][76].toString()));
                        laboratoryTest.setTiMaximum(Float.parseFloat(data[i][77].toString()));
                    }
                    // Li
                    if (data[i][78] != null || data[i][79] != null || data[i][80] != null) {
                        laboratoryTest.setIsLi(true);
                        laboratoryTest.setLiMinimum(Float.parseFloat(data[i][78].toString()));
                        laboratoryTest.setLiAverage(Float.parseFloat(data[i][79].toString()));
                        laboratoryTest.setLiMaximum(Float.parseFloat(data[i][80].toString()));
                    }
                    // Se
                    if (data[i][81] != null || data[i][82] != null || data[i][83] != null) {
                        laboratoryTest.setIsSe(true);
                        laboratoryTest.setSeMinimum(Float.parseFloat(data[i][81].toString()));
                        laboratoryTest.setSeAverage(Float.parseFloat(data[i][82].toString()));
                        laboratoryTest.setSeMaximum(Float.parseFloat(data[i][83].toString()));
                    }
                    // Sb
                    if (data[i][84] != null || data[i][85] != null || data[i][86] != null) {
                        laboratoryTest.setIsSb(true);
                        laboratoryTest.setSbMinimum(Float.parseFloat(data[i][84].toString()));
                        laboratoryTest.setSbAverage(Float.parseFloat(data[i][85].toString()));
                        laboratoryTest.setSbMaximum(Float.parseFloat(data[i][86].toString()));
                    }
                    // Ca
                    if (data[i][87] != null || data[i][88] != null || data[i][89] != null) {
                        laboratoryTest.setIsCa(true);
                        laboratoryTest.setCaMinimum(Float.parseFloat(data[i][87].toString()));
                        laboratoryTest.setCaAverage(Float.parseFloat(data[i][88].toString()));
                        laboratoryTest.setCaMaximum(Float.parseFloat(data[i][89].toString()));
                    }
                    // Fe
                    if (data[i][90] != null || data[i][91] != null || data[i][92] != null) {
                        laboratoryTest.setIsFe(true);
                        laboratoryTest.setFeMinimum(Float.parseFloat(data[i][90].toString()));
                        laboratoryTest.setFeAverage(Float.parseFloat(data[i][91].toString()));
                        laboratoryTest.setFeMaximum(Float.parseFloat(data[i][92].toString()));
                    }
                    // Pb
                    if (data[i][93] != null || data[i][94] != null || data[i][95] != null) {
                        laboratoryTest.setIsPb(true);
                        laboratoryTest.setPbMinimum(Float.parseFloat(data[i][93].toString()));
                        laboratoryTest.setPbAverage(Float.parseFloat(data[i][94].toString()));
                        laboratoryTest.setPbMaximum(Float.parseFloat(data[i][95].toString()));
                    }
                    // Cr
                    if (data[i][96] != null || data[i][97] != null || data[i][98] != null) {
                        laboratoryTest.setIsCr(true);
                        laboratoryTest.setCrMinimum(Float.parseFloat(data[i][96].toString()));
                        laboratoryTest.setCrAverage(Float.parseFloat(data[i][97].toString()));
                        laboratoryTest.setCrMaximum(Float.parseFloat(data[i][98].toString()));
                    }
                    // V
                    if (data[i][99] != null || data[i][100] != null || data[i][101] != null) {
                        laboratoryTest.setIsV(true);
                        laboratoryTest.setVMinimum(Float.parseFloat(data[i][99].toString()));
                        laboratoryTest.setVAverage(Float.parseFloat(data[i][100].toString()));
                        laboratoryTest.setVMaximum(Float.parseFloat(data[i][101].toString()));
                    }
                    // Te
                    if (data[i][102] != null || data[i][103] != null || data[i][104] != null) {
                        laboratoryTest.setIsTe(true);
                        laboratoryTest.setTeMinimum(Float.parseFloat(data[i][102].toString()));
                        laboratoryTest.setTeAverage(Float.parseFloat(data[i][103].toString()));
                        laboratoryTest.setTeMaximum(Float.parseFloat(data[i][104].toString()));
                    }
                    // Zn
                    if (data[i][105] != null || data[i][106] != null || data[i][107] != null) {
                        laboratoryTest.setIsZn(true);
                        laboratoryTest.setZnMinimum(Float.parseFloat(data[i][105].toString()));
                        laboratoryTest.setZnAverage(Float.parseFloat(data[i][106].toString()));
                        laboratoryTest.setZnMaximum(Float.parseFloat(data[i][107].toString()));
                    }
                    // Cd
                    if (data[i][108] != null || data[i][109] != null || data[i][110] != null) {
                        laboratoryTest.setIsCd(true);
                        laboratoryTest.setCdMinimum(Float.parseFloat(data[i][108].toString()));
                        laboratoryTest.setCdAverage(Float.parseFloat(data[i][109].toString()));
                        laboratoryTest.setCdMaximum(Float.parseFloat(data[i][110].toString()));
                    }
                    // K
                    if (data[i][111] != null || data[i][112] != null || data[i][113] != null) {
                        laboratoryTest.setIsK(true);
                        laboratoryTest.setKMinimum(Float.parseFloat(data[i][111].toString()));
                        laboratoryTest.setKAverage(Float.parseFloat(data[i][112].toString()));
                        laboratoryTest.setKMaximum(Float.parseFloat(data[i][113].toString()));
                    }
                    // Mn
                    if (data[i][114] != null || data[i][115] != null || data[i][116] != null) {
                        laboratoryTest.setIsMn(true);
                        laboratoryTest.setMnMinimum(Float.parseFloat(data[i][114].toString()));
                        laboratoryTest.setMnAverage(Float.parseFloat(data[i][115].toString()));
                        laboratoryTest.setMnMaximum(Float.parseFloat(data[i][116].toString()));
                    }
                    // Co
                    if (data[i][117] != null || data[i][118] != null || data[i][119] != null) {
                        laboratoryTest.setIsCo(true);
                        laboratoryTest.setCoMinimum(Float.parseFloat(data[i][117].toString()));
                        laboratoryTest.setCoAverage(Float.parseFloat(data[i][118].toString()));
                        laboratoryTest.setCoMaximum(Float.parseFloat(data[i][119].toString()));
                    }
                    // Mg
                    if (data[i][120] != null || data[i][121] != null || data[i][122] != null) {
                        laboratoryTest.setIsMg(true);
                        laboratoryTest.setMgMinimum(Float.parseFloat(data[i][120].toString()));
                        laboratoryTest.setMgAverage(Float.parseFloat(data[i][121].toString()));
                        laboratoryTest.setMgMaximum(Float.parseFloat(data[i][122].toString()));
                    }
                    // Al
                    if (data[i][123] != null || data[i][124] != null || data[i][125] != null) {
                        laboratoryTest.setIsAl(true);
                        laboratoryTest.setAlMinimum(Float.parseFloat(data[i][123].toString()));
                        laboratoryTest.setAlAverage(Float.parseFloat(data[i][124].toString()));
                        laboratoryTest.setAlMaximum(Float.parseFloat(data[i][125].toString()));
                    }
                    // As
                    if (data[i][126] != null || data[i][127] != null || data[i][128] != null) {
                        laboratoryTest.setIsAs(true);
                        laboratoryTest.setAsMinimum(Float.parseFloat(data[i][126].toString()));
                        laboratoryTest.setAsAverage(Float.parseFloat(data[i][127].toString()));
                        laboratoryTest.setAsMaximum(Float.parseFloat(data[i][128].toString()));
                    }
                    // Si
                    if (data[i][129] != null || data[i][130] != null || data[i][131] != null) {
                        laboratoryTest.setIsSi(true);
                        laboratoryTest.setSiMinimum(Float.parseFloat(data[i][129].toString()));
                        laboratoryTest.setSiAverage(Float.parseFloat(data[i][130].toString()));
                        laboratoryTest.setSiMaximum(Float.parseFloat(data[i][131].toString()));
                    }
                    // Tu
                    if (data[i][132] != null || data[i][133] != null || data[i][134] != null) {
                        laboratoryTest.setIsTu(true);
                        laboratoryTest.setTuMinimum(Float.parseFloat(data[i][132].toString()));
                        laboratoryTest.setTuAverage(Float.parseFloat(data[i][133].toString()));
                        laboratoryTest.setTuMaximum(Float.parseFloat(data[i][134].toString()));
                    }
                    // Ni
                    if (data[i][135] != null || data[i][136] != null || data[i][137] != null) {
                        laboratoryTest.setIsNi(true);
                        laboratoryTest.setNiMinimum(Float.parseFloat(data[i][135].toString()));
                        laboratoryTest.setNiAverage(Float.parseFloat(data[i][136].toString()));
                        laboratoryTest.setNiMaximum(Float.parseFloat(data[i][137].toString()));
                    }
                    // Sn
                    if (data[i][138] != null || data[i][139] != null || data[i][140] != null) {
                        laboratoryTest.setIsSn(true);
                        laboratoryTest.setSnMinimum(Float.parseFloat(data[i][138].toString()));
                        laboratoryTest.setSnAverage(Float.parseFloat(data[i][139].toString()));
                        laboratoryTest.setSnMaximum(Float.parseFloat(data[i][140].toString()));
                    }
                    // Tl
                    if (data[i][141] != null || data[i][142] != null || data[i][143] != null) {
                        laboratoryTest.setIsTl(true);
                        laboratoryTest.setTlMinimum(Float.parseFloat(data[i][141].toString()));
                        laboratoryTest.setTlAverage(Float.parseFloat(data[i][142].toString()));
                        laboratoryTest.setTlMaximum(Float.parseFloat(data[i][143].toString()));
                    }
                    // 金属成分1
                    if (data[i][144] != null || data[i][145] != null || data[i][146] != null) {
                        laboratoryTest.setOtherMetal1("");
                        laboratoryTest.setMetal1Minimum(Float.parseFloat(data[i][144].toString()));
                        laboratoryTest.setMetal1Average(Float.parseFloat(data[i][145].toString()));
                        laboratoryTest.setMetal1Maximum(Float.parseFloat(data[i][146].toString()));
                    }
                    // 金属成分2
                    if (data[i][147] != null || data[i][148] != null || data[i][149] != null) {
                        laboratoryTest.setOtherMetal2("");
                        laboratoryTest.setMetal2Minimum(Float.parseFloat(data[i][147].toString()));
                        laboratoryTest.setMetal2Average(Float.parseFloat(data[i][148].toString()));
                        laboratoryTest.setMetal2Maximum(Float.parseFloat(data[i][149].toString()));
                    }
                    // 金属成分3
                    if (data[i][150] != null || data[i][151] != null || data[i][152] != null) {
                        laboratoryTest.setOtherMetal3("");
                        laboratoryTest.setMetal3Minimum(Float.parseFloat(data[i][150].toString()));
                        laboratoryTest.setMetal3Average(Float.parseFloat(data[i][151].toString()));
                        laboratoryTest.setMetal3Maximum(Float.parseFloat(data[i][152].toString()));
                    }
                    // 金属成分4
                    if (data[i][153] != null || data[i][154] != null || data[i][155] != null) {
                        laboratoryTest.setOtherMetal4("");
                        laboratoryTest.setMetal4Minimum(Float.parseFloat(data[i][153].toString()));
                        laboratoryTest.setMetal4Average(Float.parseFloat(data[i][154].toString()));
                        laboratoryTest.setMetal4Maximum(Float.parseFloat(data[i][155].toString()));
                    }
                    // 设置状态为待提交
                    laboratoryTest.setCheckState(CheckState.ToSubmit);
                    // 设置编号
                    laboratoryTest.setLaboratoryTestNumber(laboratoryTestService.getCurrentId());
                    laboratoryTest.setQueryNumber(RandomUtil.getRandomEightNumber());
                    // 增加化验单
                    laboratoryTestService.add(laboratoryTest);
                }
            }
            res.put("status", "success");
            res.put("message", "导入成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "导入失败，请检查文件！");
            res.put("exception", e.getMessage());
        }
        return res.toString();

    }

    /**
     * 获取目前的客户编号
     * @return 客户编号
     */
    @RequestMapping("getCurrentLaboratoryTestId")
    @ResponseBody
    public String getCurrentLaboratoryTestId() {
        //得到一个NumberFormat的实例
        NumberFormat nf = NumberFormat.getInstance();
        //设置是否使用分组
        nf.setGroupingUsed(false);
        //设置最大整数位数
        nf.setMaximumIntegerDigits(4);
        //设置最小整数位数
        nf.setMinimumIntegerDigits(4);
        // 获取最新编号
        String id;
        int index = laboratoryTestService.count();
        // 获取唯一的编号
        do {
            index += 1;
            id = nf.format(index);
        } while (laboratoryTestService.getLaboratoryTestById(id) != null);
        JSONObject res = new JSONObject();
        res.put("laboratoryTestId", id);
        return res.toString();
    }

    /**
     * 获取化验单对象
     * @param laboratoryTestNumber 化验单号
     * @return 化验单对象
     */
    @RequestMapping("getLaboratoryTest")
    @ResponseBody
    public String getLaboratoryTest(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            // 通过化验单号拿到对应的数据
            LaboratoryTest laboratoryTest = laboratoryTestService.getLaboratoryTestById(laboratoryTestNumber);
            // 制作json数据
            JSONObject data = JSONObject.fromBean(laboratoryTest);
            res.put("status","success");
            res.put("message","查看成功");
            // 放入数据
            res.put("data", data);
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","查看失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单状态为作废
     * @param laboratoryTestNumber 化验单号
     * @return 作废成功与否
     */
    @RequestMapping("setLaboratoryTestInvalid")
    @ResponseBody
    public String setInvalid(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.setInvalid(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","作废成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","作废失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单状态为已化验
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestTested")
    @ResponseBody
    public String setTested(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.setTested(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","化验成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","化验失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单对象状态为已化验
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestSubmit")
    @ResponseBody
    public String submit(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.submit(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","提交成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","提交失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }

    /**
     * 设置化验单对象状态为已确认
     * @param laboratoryTestNumber 化验单号
     * @return 成功与否
     */
    @RequestMapping("setLaboratoryTestConfirm")
    @ResponseBody
    public String confirm(String laboratoryTestNumber){
        JSONObject res = new JSONObject();
        try{
            laboratoryTestService.confirm(laboratoryTestNumber);
            res.put("status","success");
            res.put("message","确认成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status","fail");
            res.put("message","确认失败");
            res.put("exception",e.getMessage());
        }
        return res.toString();
    }
}
