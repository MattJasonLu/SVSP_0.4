package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.service.*;
import com.jdlink.util.RandomUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.text.NumberFormat;
import java.util.List;

/**
 * Created by matt on 2018/4/28.
 * 调查表控制器
 */
@Controller
public class QuestionnaireController {

    @Autowired
    ClientService clientService;
    @Autowired
    QuestionnaireService questionnaireService;
    @Autowired
    RawWastesService rawWastesService;
    @Autowired
    WasteInclusionTypeService wasteInclusionTypeService;
    @Autowired
    WasteProcessService wasteProcessService;
    @Autowired
    DeriveWastesService deriveWastesService;
    @Autowired
    MixingElementService mixingElementService;
    @Autowired
    SensitiveElementService sensitiveElementService;
    /**
     * 保存的问卷对象
     */
    private static Questionnaire questionnaire = new Questionnaire();

    /**
     * 列出所有问卷
     * @return 问卷列表
     */
    @RequestMapping("listQuestionnaire")
    @ResponseBody
    public String listQuestionnaire() {
        return listClientQuestionnaire();
    }

    /**
     * 列出客户的问卷
     * @return 问卷列表
     */
    @RequestMapping("client/listQuestionnaire")
    @ResponseBody
    public String listClientQuestionnaire() {
        JSONObject res = new JSONObject();
        try {
            List<Questionnaire> questionnaireList = questionnaireService.list();
            JSONArray array = JSONArray.fromArray(questionnaireList.toArray(new Questionnaire[questionnaireList.size()]));
            res.put("data", array);
            res.put("message", "获取信息成功");
            res.put("status", "success");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("message", "获取信息失败");
            res.put("status", "fail");
        }
        return res.toString();
    }

    /**
     * 保存问卷页面1的信息
     * @param questionnaire 问卷对象
     * @return 成功与否
     */
    @RequestMapping(value = {"savePage1Info", "client/savePage1Info"})
    @ResponseBody
    public String savePage1Info(@RequestBody Questionnaire questionnaire) {
        JSONObject res = new JSONObject();
        // 如果获取的问卷不为空
        if (questionnaire != null) {
            // 设置问卷的编号
            QuestionnaireController.questionnaire.setQuestionnaireId(questionnaire.getQuestionnaireId());
            // 设置问卷的归属客户信息
            // 更新id
            questionnaire.getClient().setClientId(clientService.getByName(questionnaire.getClient().getCompanyName()).getClientId());
            QuestionnaireController.questionnaire.setClient(questionnaire.getClient());
            // 设置问卷的填报人
            QuestionnaireController.questionnaire.setAuthor(questionnaire.getAuthor());
            // 设置问卷的时间
            QuestionnaireController.questionnaire.setTime(questionnaire.getTime());
            res.put("status", "success");
            res.put("message", "页面1数据保存成功");
        } else {
            res.put("status", "fail");
            res.put("message", "页面1数据保存失败");
        }
        return res.toString();
    }

    /**
     * 保存问卷页面2的信息
     * @param questionnaire 问卷对象
     * @return 成功与否
     */
    @RequestMapping(value = {"savePage2Info", "client/savePage2Info"})
    @ResponseBody
    public String savePage2Info(@RequestBody Questionnaire questionnaire) {
        JSONObject res = new JSONObject();
        try {
            // 设置原材料的编号
            int oldCount = 0;
            if (QuestionnaireController.questionnaire.getRawWastesList() != null)
                oldCount = QuestionnaireController.questionnaire.getRawWastesList().size();
            int newCount = questionnaire.getRawWastesList().size();
            // 固定旧编号
            for (int i = 0; i < oldCount; i++) {
                questionnaire.getRawWastesList().get(i).setMaterialId(QuestionnaireController.questionnaire.getRawWastesList().get(i).getMaterialId());
            }
            for (int i = oldCount; i < newCount; i++) {
                // 如果不存在编号再进行赋值
                questionnaire.getRawWastesList().get(i).setMaterialId(RandomUtil.getRandomEightNumber());
            }
            // 设置处理流程的编号
            oldCount = 0;
            if (QuestionnaireController.questionnaire.getWasteProcessList() != null)
                oldCount = QuestionnaireController.questionnaire.getWasteProcessList().size();
            newCount = questionnaire.getWasteProcessList().size();
            for (int i = 0; i < oldCount; i++) {
                questionnaire.getWasteProcessList().get(i).setProcessId(QuestionnaireController.questionnaire.getWasteProcessList().get(i).getProcessId());
            }
            for (int i = oldCount; i < newCount; i++) {
                questionnaire.getWasteProcessList().get(i).setProcessId(RandomUtil.getRandomEightNumber());
            }
            // 更新原材料的信息
            QuestionnaireController.questionnaire.setRawWastesList(questionnaire.getRawWastesList());
            // 更新特别关注物质的信息
            QuestionnaireController.questionnaire.setWasteInclusionTypeList(questionnaire.getWasteInclusionTypeList());
            // 更新工艺流程的信息
            QuestionnaireController.questionnaire.setWasteProcessList(questionnaire.getWasteProcessList());
            res.put("status", "success");
            res.put("message", "页面2数据保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "页面2数据保存失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 保存问卷页面3的信息
     * @param questionnaire 问卷对象
     * @return 成功与否
     */
    @RequestMapping(value = {"savePage3Info", "client/savePage3Info"})
    @ResponseBody
    public String savePage3Info(@RequestBody Questionnaire questionnaire) {
        JSONObject res = new JSONObject();
        try {
            // 更新危废名称、代码、物理形态、混合物列表、敏感酸性列表
            // 新的引入物质数量
            int oldCount = QuestionnaireController.questionnaire.getDeriveWastesList().size();
            int newCount = questionnaire.getDeriveWastesList().size();
            // 设置引入物质的编号
//            for (DeriveWastes deriveWastes : questionnaire.getDeriveWastesList()) {
//                if (deriveWastes.getId() == null || deriveWastes.getId().equals("")) deriveWastes.setId(RandomUtil.getRandomEightNumber());
//                // 混合物成分编号
//                if (deriveWastes.getMixingElementList().size() > 0)
//                    for (MixingElement mixingElement : deriveWastes.getMixingElementList()) {
//                        if (mixingElement.getId() == null || mixingElement.getId().equals("")) mixingElement.setId(RandomUtil.getRandomEightNumber());
//                    }
//                // 敏感成分编号
//                if (deriveWastes.getSensitiveElementList().size() > 0)
//                    for (SensitiveElement sensitiveElement : deriveWastes.getSensitiveElementList()) {
//                        if (sensitiveElement.getId() == null || sensitiveElement.getId().equals("")) sensitiveElement.setId(RandomUtil.getRandomEightNumber());
//                    }
//            }
            // 如果旧数据不存在，则直接赋值
            if (oldCount == 0) {
                for (DeriveWastes deriveWastes : questionnaire.getDeriveWastesList()) {
                    deriveWastes.setId(RandomUtil.getRandomEightNumber());
                    for (MixingElement mixingElement : deriveWastes.getMixingElementList()) {
                        mixingElement.setId(RandomUtil.getRandomEightNumber());
                    }
                    for (SensitiveElement sensitiveElement : deriveWastes.getSensitiveElementList()) {
                        sensitiveElement.setId(RandomUtil.getRandomEightNumber());
                    }
                }
                QuestionnaireController.questionnaire.setDeriveWastesList(questionnaire.getDeriveWastesList());
            // 如果旧数据存在，且数量小于新数据
            } else if (oldCount <= newCount) {
                for (int i = 0; i < oldCount; i++) {
                    DeriveWastes newDeriveWastes = questionnaire.getDeriveWastesList().get(i);
                    DeriveWastes oldDeriveWastes = QuestionnaireController.questionnaire.getDeriveWastesList().get(i);
                    newDeriveWastes.setId(oldDeriveWastes.getId());
                    // 混合物成分编号
                    int innerOldCount = 0;
                    if (oldDeriveWastes.getMixingElementList() != null)
                        innerOldCount = oldDeriveWastes.getMixingElementList().size();
                    int innerNewCount = newDeriveWastes.getMixingElementList().size();
                    for (int j = 0; j < innerOldCount; j++) {
                        newDeriveWastes.getMixingElementList().get(j).setId(oldDeriveWastes.getMixingElementList().get(j).getId());
                    }
                    for (int j = innerOldCount; j < innerNewCount; j++) {
                        newDeriveWastes.getMixingElementList().get(j).setId(RandomUtil.getRandomEightNumber());
                    }
                    // 敏感成分编号
                    innerOldCount = 0;
                    if (oldDeriveWastes.getSensitiveElementList() != null)
                        innerOldCount = oldDeriveWastes.getSensitiveElementList().size();
                    innerNewCount = newDeriveWastes.getSensitiveElementList().size();
                    for (int j = 0; j < innerOldCount; j++) {
                        newDeriveWastes.getSensitiveElementList().get(j).setId(oldDeriveWastes.getSensitiveElementList().get(j).getId());
                    }
                    for (int j = innerOldCount; j < innerNewCount; j++) {
                        newDeriveWastes.getSensitiveElementList().get(j).setId(RandomUtil.getRandomEightNumber());
                    }
                    oldDeriveWastes.setName(newDeriveWastes.getName());
                    oldDeriveWastes.setCode(newDeriveWastes.getCode());
                    oldDeriveWastes.setFormType(newDeriveWastes.getFormType());
                    oldDeriveWastes.setFormTypeDetail(newDeriveWastes.getFormTypeDetail());
                    oldDeriveWastes.setSmellType(newDeriveWastes.getSmellType());
                    oldDeriveWastes.setSmellTypeDetail(newDeriveWastes.getSmellTypeDetail());
                    oldDeriveWastes.setSolubility(newDeriveWastes.getSolubility());
                    oldDeriveWastes.setSolubilityDetail(newDeriveWastes.getSolubilityDetail());
                    oldDeriveWastes.setIsLowTemp(newDeriveWastes.getIsLowTemp());
                    oldDeriveWastes.setIsMixture(newDeriveWastes.getIsMixture());
                    oldDeriveWastes.setMixingElementList(newDeriveWastes.getMixingElementList());
                    oldDeriveWastes.setSensitiveElementList(newDeriveWastes.getSensitiveElementList());
                    // 新的混合物列表数量
//                    int newMixCount = newDeriveWastes.getMixingElementList().size();
//                    if (oldDeriveWastes.getMixingElementList() == null) {
//                        oldDeriveWastes.setMixingElementList(newDeriveWastes.getMixingElementList());
//                    } else {
//                        int oldMixCount = oldDeriveWastes.getMixingElementList().size();
//                        for (int j = 0; j < oldMixCount; j++) {
//                            oldDeriveWastes.getMixingElementList().get(j).setName(newDeriveWastes.getMixingElementList().get(j).getName());
//                            oldDeriveWastes.getMixingElementList().get(j).setMinimum(newDeriveWastes.getMixingElementList().get(j).getMinimum());
//                            oldDeriveWastes.getMixingElementList().get(j).setAverage(newDeriveWastes.getMixingElementList().get(j).getAverage());
//                            oldDeriveWastes.getMixingElementList().get(j).setMaximum(newDeriveWastes.getMixingElementList().get(j).getMaximum());
//                        }
//                        for (int j = oldMixCount; j < newMixCount; j++) {
//                            oldDeriveWastes.getMixingElementList().add(newDeriveWastes.getMixingElementList().get(j));
//                        }
//                    }
                    // 新的敏感成分列表
//                    int newSenCount = newDeriveWastes.getSensitiveElementList().size();
//                    if (oldDeriveWastes.getSensitiveElementList() == null) {
//                        oldDeriveWastes.setSensitiveElementList(newDeriveWastes.getSensitiveElementList());
//                    } else {
//                        int oldSenCount = oldDeriveWastes.getSensitiveElementList().size();
//                        for (int j = 0; j < oldSenCount; j++) {
//                            oldDeriveWastes.getSensitiveElementList().get(j).setChemicalType(newDeriveWastes.getSensitiveElementList().get(j).getChemicalType());
//                            oldDeriveWastes.getSensitiveElementList().get(j).setIsOrganic(newDeriveWastes.getSensitiveElementList().get(j).getIsOrganic());
//                        }
//                        for (int j = oldSenCount; j < newSenCount; j++) {
//                            oldDeriveWastes.getSensitiveElementList().add(newDeriveWastes.getSensitiveElementList().get(j));
//                        }
//                    }
                }
                // 对于新增加的数据则直接添加
                for (int i = oldCount; i < newCount; i++) {
                    QuestionnaireController.questionnaire.getDeriveWastesList().add(questionnaire.getDeriveWastesList().get(i));
                }
            }
            res.put("status", "success");
            res.put("message", "页面3数据保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "页面3数据保存失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 保存问卷页面4的信息
     * @param questionnaire 问卷对象
     * @return 成功与否
     */
    @RequestMapping(value = {"savePage4Info", "client/savePage4Info"})
    @ResponseBody
    public String savePage4Info(@RequestBody Questionnaire questionnaire) {
        JSONObject res = new JSONObject();
        try {
            // 更新危废特性、防护处理和对应措施
            int oldCount = QuestionnaireController.questionnaire.getDeriveWastesList().size();
            int newCount = questionnaire.getDeriveWastesList().size();
            // 设置引入物质的编号
//            for (DeriveWastes deriveWastes : questionnaire.getDeriveWastesList()) {
//                if (deriveWastes.getId() == null || deriveWastes.getId().equals("")) deriveWastes.setId(RandomUtil.getRandomEightNumber());
//                // 混合物成分编号
//                if (deriveWastes.getMixingElementList() != null)
//                    for (MixingElement mixingElement : deriveWastes.getMixingElementList()) {
//                        if (mixingElement.getId() == null || mixingElement.getId().equals("")) mixingElement.setId(RandomUtil.getRandomEightNumber());
//                    }
//                // 敏感成分编号
//                if (deriveWastes.getSensitiveElementList() != null)
//                    for (SensitiveElement sensitiveElement : deriveWastes.getSensitiveElementList()) {
//                        if (sensitiveElement.getId() == null || sensitiveElement.getId().equals("")) sensitiveElement.setId(RandomUtil.getRandomEightNumber());
//                    }
//            }
            if (oldCount == 0) {
                for (DeriveWastes deriveWastes : questionnaire.getDeriveWastesList()) {
                    deriveWastes.setId(RandomUtil.getRandomEightNumber());
                }
                QuestionnaireController.questionnaire.setDeriveWastesList(questionnaire.getDeriveWastesList());
            } else if (oldCount <= newCount) {
                for (int i = 0; i < oldCount; i++) {
                    DeriveWastes newDeriveWastes = questionnaire.getDeriveWastesList().get(i);
                    DeriveWastes oldDeriveWastes = QuestionnaireController.questionnaire.getDeriveWastesList().get(i);
                    newDeriveWastes.setId(oldDeriveWastes.getId());
                    oldDeriveWastes.setName(newDeriveWastes.getName());
                    oldDeriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
                    oldDeriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
                    oldDeriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
                    oldDeriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
                    oldDeriveWastes.setPutOutFireMeasures(newDeriveWastes.getSuctionMeasures());
                    oldDeriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
                    oldDeriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
                    oldDeriveWastes.setWasteCharacterList(newDeriveWastes.getWasteCharacterList());
                    oldDeriveWastes.setWasteProtectList(newDeriveWastes.getWasteProtectList());
                }
                for (int i = oldCount; i < newCount; i++) {
                    QuestionnaireController.questionnaire.getDeriveWastesList().add(questionnaire.getDeriveWastesList().get(i));
                }
            }
            res.put("status", "success");
            res.put("message", "页面4数据保存成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "页面4数据保存失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 增加调查表
     * @return 成功与否
     */
    @RequestMapping(value = {"addQuestionnaire", "client/addQuestionnaire"})
    @ResponseBody
    public String addQuestionnaire(){
        JSONObject res = new JSONObject();
        try {
            // 更改状态为待签收
            QuestionnaireController.questionnaire.setApplyState(ApplyState.ToSignIn);
            questionnaireService.add(QuestionnaireController.questionnaire);
            QuestionnaireController.questionnaire = new Questionnaire();
            res.put("status", "success");
            res.put("message", "增加调查表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "增加调查表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 保存调查表
     * @return 成功与否
     */
    @RequestMapping(value = {"saveQuestionnaire", "client/saveQuestionnaire"})
    @ResponseBody
    public String saveQuestionnaire() {
        JSONObject res = new JSONObject();
        try {
            // 更改状态为待签收
            QuestionnaireController.questionnaire.setApplyState(ApplyState.ToSubmit);
            questionnaireService.add(QuestionnaireController.questionnaire);
            QuestionnaireController.questionnaire = new Questionnaire();
            res.put("status", "success");
            res.put("message", "保存调查表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "保存调查表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 更新调查表
     * @return 成功与否
     */
    @RequestMapping("updateQuestionnaire")
    @ResponseBody
    public String updateQuestionnaire() {
        JSONObject res = new JSONObject();
        try {
            questionnaireService.update(QuestionnaireController.questionnaire);
            res.put("status", "success");
            res.put("message", "更新调查表成功");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "更新调查表失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取问卷编号
     * @return 问卷编号
     */
    @RequestMapping(value = {"getCurrentQuestionnaireId", "client/getCurrentQuestionnaireId"})
    @ResponseBody
    public String getCurrentQuestionnaireId() {
        JSONObject res = new JSONObject();
        try {
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
            int index = questionnaireService.count();
            // 获取唯一的编号
            do {
                index += 1;
                id = nf.format(index);
            } while (questionnaireService.getById(id) != null);
            res.put("status", "success");
            res.put("message", "获取问卷编号成功");
            res.put("questionnaireId", id);
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取问卷编号失败");
            res.put("exception", e.getMessage());
        }
        return res.toString();
    }

    /**
     * 获取调查表的数据
     * @return 成功与否
     */
    @RequestMapping(value = {"getCurrentQuestionnaire", "client/getCurrentQuestionnaire"})
    @ResponseBody
    public String getCurrentQuestionnaire(String questionnaireId) {
        JSONObject res = new JSONObject();
        try {
            if (questionnaireId != null && !questionnaireId.equals("")) {
                Questionnaire questionnaire = questionnaireService.getById(questionnaireId);
                if (questionnaire != null) {
                    QuestionnaireController.questionnaire = questionnaire;
                }
            } else {
                if (QuestionnaireController.questionnaire.getQuestionnaireId() == null) throw new Exception("无数据");
            }
            // 数据转换JSON
            JSONObject data = JSONObject.fromBean(QuestionnaireController.questionnaire);
            res.put("status", "success");
            res.put("data", data);
            res.put("message", "获取调查表数据成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "获取调查表数据失败");
        }
        return res.toString();
    }

    @RequestMapping("client/clearCurrentQuestionnaire")
    @ResponseBody
    public String clearCurrentQuestionnaire() {
        JSONObject res = new JSONObject();
        try {
            QuestionnaireController.questionnaire = new Questionnaire();
            res.put("status", "success");
            res.put("message", "清空数据成功");
        } catch (Exception e) {
            res.put("status", "fail");
            res.put("message", "清空数据失败");
        }
        return res.toString();
    }

    /**
     * 问卷页面3中三个枚举数据
     * @return 枚举数据
     */
    @RequestMapping(value={"getQuestionnaireSelectedList", "client/getQuestionnaireSelectedList"})
    @ResponseBody
    public String getQuestionnaireSelectedList() {
        JSONObject res = new JSONObject();
        // 获取枚举
        JSONArray array1 = JSONArray.fromArray(FormType.values());
        res.put("formTypeStrList", array1);
        JSONArray array2 = JSONArray.fromArray(SmellType.values());
        res.put("smellTypeStrList", array2);
        JSONArray array3 = JSONArray.fromArray(Solubility.values());
        res.put("solubilityStrList", array3);
        return res.toString();
    }



    /********************************************下面暂时不用****************************************/

    @RequestMapping("deleteQuestionnaire")
    public ModelAndView deleteQuestionnaire(HttpSession session, String questionnaireId) {
        ModelAndView mav = new ModelAndView();
        try {
            questionnaireService.delete(questionnaireId);
            // 通过session获取到客户编号clientId
            Client client = (Client) session.getAttribute("client");
            List<Questionnaire> questionnaireList = questionnaireService.getByClientId(client.getClientId());
            mav.addObject("questionnaireList", questionnaireList);
            mav.addObject("client", client);
            mav.setViewName("assessment");
        } catch (Exception e) {
            mav.addObject("message", "删除失败！");
            mav.setViewName("fail");
        }
        return mav;
    }

    @RequestMapping("searchQuestionnaire")
    @ResponseBody
    public String searchQuestionnaire(String keyword) {
        try {
            List<QuestionnaireAdmin> questionnaireList = questionnaireService.search(keyword);
            JSONArray array = JSONArray.fromArray(questionnaireList.toArray(new QuestionnaireAdmin[questionnaireList.size()]));
            return array.toString();
        } catch (Exception e) {
            e.printStackTrace();
            JSONObject res = new JSONObject();
            res.put("status", "fail");
            res.put("message", "查询失败!");
            res.put("stackTrace", e.getStackTrace());
            return res.toString();
        }
    }

//    @RequestMapping("addQuestionnaire")
//    public ModelAndView addQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
//        // TODO: 当前增加调查表仅支持单个材料，多个材料后期完善
//        ModelAndView mav = new ModelAndView();
//        // 从session中获取
//        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//        // 更新数据
//        for (int i = 0; i < questionnaire.getDeriveWastesList().size() && i < newQuestionnaire.getDeriveWastesList().size(); i++) {
//            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
//            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
//            if (newDeriveWastes.getWasteCharacterList() != null) {
//                List<WasteCharacter> wasteCharacterList = new ArrayList<>();
//                for (WasteCharacter wasteCharacter : newDeriveWastes.getWasteCharacterList()) {
//                    if (wasteCharacter != null) wasteCharacterList.add(wasteCharacter);
//                }
//                deriveWastes.setWasteCharacterList(wasteCharacterList);
//            }
//            if (newDeriveWastes.getWasteProtectList() != null) {
//                List<WasteProtect> wasteProtectList = new ArrayList<>();
//                for (WasteProtect wasteProtect : newDeriveWastes.getWasteProtectList()) {
//                    if (wasteProtect != null) wasteProtectList.add(wasteProtect);
//                }
//                deriveWastes.setWasteProtectList(wasteProtectList);
//            }
//            deriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
//            deriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
//            deriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
//            deriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
//            deriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
//            deriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
//        }
//
//        // 添加调查表
//        questionnaireService.add(questionnaire);
//        // 添加调查表中的原材料
//        for (RawWastes rawWastes : questionnaire.getRawWastesList()) {
//            rawWastesService.add(rawWastes);
//        }
//        // 添加调查表中的处理流程
//        for (WasteProcess wasteProcess : questionnaire.getWasteProcessList()) {
//            wasteProcessService.add(wasteProcess);
//        }
//        // 添加调查表中的次生危废
//        for (DeriveWastes wastes : questionnaire.getDeriveWastesList()) {
//            deriveWastesService.add(wastes);
//            if (wastes.getMixingElementList() != null)
//            for (MixingElement mixingElement : wastes.getMixingElementList()) {
//                mixingElementService.add(mixingElement);
//            }
//            if (wastes.getSensitiveElementList() != null)
//            for (SensitiveElement sensitiveElement : wastes.getSensitiveElementList()) {
//                sensitiveElementService.add(sensitiveElement);
//            }
//        }
//        mav.addObject("questionnaire", questionnaire);
//        mav.addObject("message", "新增调查表成功！");
//        mav.setViewName("success");
//
//        return mav;
//    }

//    @RequestMapping("showQuestionnaire")
//    public ModelAndView showQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
//        ModelAndView mav = new ModelAndView();
//        // 第一次进入清空session
//        session.removeAttribute("questionnaire");
//        session.removeAttribute("isUpdate");
//        // 获取用户
//        Client client = (Client) session.getAttribute("client");
//        if (client != null) {
//            mav.addObject("client", client);
//        }
//        mav.setViewName("questionnaire1");
//        // 如果存在问卷编号
//        if (session.getAttribute("questionnaire") == null) {
//            Questionnaire questionnaire = new Questionnaire();
//            if (newQuestionnaire.getQuestionnaireId() == null) {
//                // 创建调查表数据对象
//                questionnaire.setTime(new Date()); // 获取当前时间
//                questionnaire.setClientId(client.getClientId());
//                questionnaire.setQuestionnaireId(RandomUtil.getRandomFileName());
//            } else {
//                // 设置页面为更新进入
//                session.setAttribute("isUpdate", true);
//                // TODO: 优化部分，后期有时间将其get统一整合进 "questionnaire.xml"
//                // 取得调查表对象
//                questionnaire = questionnaireService.getById(newQuestionnaire.getQuestionnaireId());
//                // 装载原材料
//                questionnaire.setRawWastesList(rawWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
//                // 装载处理流程
//                questionnaire.setWasteProcessList(wasteProcessService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
//                // 装载次生危废
//                questionnaire.setDeriveWastesList(deriveWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
//            }
//            // 添加session
//            session.setAttribute("questionnaire", questionnaire);
//
//            mav.addObject("questionnaire", questionnaire);
//        } else {
//            Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//            // 更新页面2传递过来的数据
////            if (newQuestionnaire.getRawWastesList().size() > 0) {
////                for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
////                    if (rawWastes != null && rawWastes.getMaterialId() == null) {
////                        rawWastes.setMaterialId(RandomUtil.getRandomFileName());
////                    }
////                }
////                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
////            }
////            if (newQuestionnaire.getWasteProcessList().size() > 0) {
////                for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
////                    if (wasteProcess != null && wasteProcess.getProcessId() == null) {
////                        wasteProcess.setProcessId(RandomUtil.getRandomFileName());
////                    }
////                }
////                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
////            }
//            // 特别关注的物质列表
//
//            if (newQuestionnaire.getRawWastesList().size() > 0) {
//                List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
//                List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
//                // 如果旧列表不为空
//                if (oldRawWastesList.size() > 0) {
//                    for (int i = 0; i < oldRawWastesList.size(); i++) {
//                        newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
//                    }
//                } else {
//                    for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
//                        if (rawWastes != null) {
//                            rawWastes.setMaterialId(RandomUtil.getRandomFileName());
//                        }
//                    }
//                }
//                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
//            }
//            if (newQuestionnaire.getWasteProcessList().size() > 0) {
//
//                List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
//                List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
//                if (oldWasteProcessList.size() > 0) {
//                    for (int i = 0; i < oldWasteProcessList.size(); i++) {
//                        // 将旧列表的id赋值到新列表
//                        newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
//                    }
//                } else {
//                    for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
//                        if (wasteProcess != null && wasteProcess.getProcessId() == null) {
//                            wasteProcess.setProcessId(RandomUtil.getRandomFileName());
//                        }
//                    }
//                }
//                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
//            }
//
//            List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
//            if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
//                for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
//                    if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
//                }
//                // 更新
//                questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
//            }
//            mav.addObject("questionnaire", questionnaire);
//        }
//        return mav;
//    }

//    @RequestMapping("showQuestionnaireAdmin")
//    public ModelAndView showQuestionnaireAdmin(HttpSession session, Questionnaire newQuestionnaire) {
//        ModelAndView mav = new ModelAndView();
//        // 第一次进入清空session
//        session.removeAttribute("questionnaire");
//        session.removeAttribute("isUpdate");
//        session.removeAttribute("client");
//        mav.setViewName("questionnaire1");
//        // 如果存在问卷编号
//        if (session.getAttribute("questionnaire") == null) {
//            Questionnaire questionnaire = new Questionnaire();
//            if (newQuestionnaire.getQuestionnaireId() == null) {
//                // 创建调查表数据对象
//                questionnaire.setTime(new Date()); // 获取当前时间
//                questionnaire.setQuestionnaireId(RandomUtil.getRandomFileName());
//            } else {
//                // 设置页面为更新进入
//                session.setAttribute("isUpdate", true);
//                // TODO: 优化部分，后期有时间将其get统一整合进 "questionnaire.xml"
//                // 取得调查表对象
//                questionnaire = questionnaireService.getById(newQuestionnaire.getQuestionnaireId());
//                // 装载原材料
//                questionnaire.setRawWastesList(rawWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
//                // 装载处理流程
//                questionnaire.setWasteProcessList(wasteProcessService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
//                // 装载次生危废
//                questionnaire.setDeriveWastesList(deriveWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
//            }
//            // 添加session
//            session.setAttribute("questionnaire", questionnaire);
//
//            mav.addObject("questionnaire", questionnaire);
//        } else {
//            Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//            // 更新页面2传递过来的数据
////            if (newQuestionnaire.getRawWastesList().size() > 0) {
////                for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
////                    if (rawWastes != null && rawWastes.getMaterialId() == null) {
////                        rawWastes.setMaterialId(RandomUtil.getRandomFileName());
////                    }
////                }
////                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
////            }
////            if (newQuestionnaire.getWasteProcessList().size() > 0) {
////                for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
////                    if (wasteProcess != null && wasteProcess.getProcessId() == null) {
////                        wasteProcess.setProcessId(RandomUtil.getRandomFileName());
////                    }
////                }
////                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
////            }
//            // 特别关注的物质列表
//
//            if (newQuestionnaire.getRawWastesList().size() > 0) {
//                List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
//                List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
//                // 如果旧列表不为空
//                if (oldRawWastesList.size() > 0) {
//                    for (int i = 0; i < oldRawWastesList.size(); i++) {
//                        newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
//                    }
//                } else {
//                    for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
//                        if (rawWastes != null) {
//                            rawWastes.setMaterialId(RandomUtil.getRandomFileName());
//                        }
//                    }
//                }
//                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
//            }
//            if (newQuestionnaire.getWasteProcessList().size() > 0) {
//
//                List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
//                List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
//                if (oldWasteProcessList.size() > 0) {
//                    for (int i = 0; i < oldWasteProcessList.size(); i++) {
//                        // 将旧列表的id赋值到新列表
//                        newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
//                    }
//                } else {
//                    for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
//                        if (wasteProcess != null && wasteProcess.getProcessId() == null) {
//                            wasteProcess.setProcessId(RandomUtil.getRandomFileName());
//                        }
//                    }
//                }
//                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
//            }
//
//            List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
//            if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
//                for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
//                    if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
//                }
//                // 更新
//                questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
//            }
//            mav.addObject("questionnaire", questionnaire);
//        }
//        return mav;
//    }

//    @RequestMapping("firstQuestionnaire")
//    public ModelAndView firstQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
//        ModelAndView mav = new ModelAndView();
//        // 获取用户
//        Client client = (Client) session.getAttribute("client");
//        mav.addObject("client", client);
//        mav.setViewName("questionnaire1");
//        // 如果存在问卷编号
//        if (session.getAttribute("questionnaire") == null) {
//            Questionnaire questionnaire = new Questionnaire();
//            if (newQuestionnaire.getQuestionnaireId() == null) {
//                // 创建调查表数据对象
//                questionnaire.setTime(new Date()); // 获取当前时间
//                questionnaire.setClientId(client.getClientId());
//                questionnaire.setQuestionnaireId(RandomUtil.getRandomFileName());
//            } else {
//                List<Questionnaire> questionnaireList = questionnaireService.get(client.getClientId(), newQuestionnaire.getQuestionnaireId());
//                questionnaire = questionnaireList.get(0);
//            }
//
//            session.setAttribute("questionnaire", questionnaire);
//        } else {
//            Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//
//            // 更新页面2传递过来的数据
//            // 设置原材料的编号
//            // 保持新旧两个列表的元素id一致
//            // 设置原材料的编号，随机
//            if (newQuestionnaire.getRawWastesList().size() > 0) {
//                List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
//                List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
//                // 如果旧列表不为空
//                if (oldRawWastesList.size() > 0) {
//                    for (int i = 0; i < oldRawWastesList.size(); i++) {
//                        newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
//                    }
//                } else {
//                    for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
//                        if (rawWastes != null) {
//                            rawWastes.setMaterialId(RandomUtil.getRandomFileName());
//                        }
//                    }
//                }
//                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
//            }
//            if (newQuestionnaire.getWasteProcessList().size() > 0) {
//
//                List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
//                List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
//                if (oldWasteProcessList.size() > 0) {
//                    for (int i = 0; i < oldWasteProcessList.size(); i++) {
//                        // 将旧列表的id赋值到新列表
//                        newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
//                    }
//                } else {
//                    for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
//                        if (wasteProcess != null && wasteProcess.getProcessId() == null) {
//                            wasteProcess.setProcessId(RandomUtil.getRandomFileName());
//                        }
//                    }
//                }
//                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
//            }
//
//            // 特别关注的物质列表
//            List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
//            if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
//                for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
//                    if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
//                }
//                // 更新
//                questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
//            }
//
//            mav.addObject("questionnaire", questionnaire);
//        }
//        return mav;
//    }
//
//    @RequestMapping("secondQuestionnaire")
//    public ModelAndView secondQuestionnaire(HttpSession session, Questionnaire newQuestionnaire, String companyName) {
//        ModelAndView mav = new ModelAndView();
//        // 获取调查表对象
//        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//
//        // 更新填表人
//        if (newQuestionnaire.getAuthor() != null) {
//            // 处理session不存在client信息的情况
//            if (session.getAttribute("client") == null) {
//                Client client = clientService.getByName(companyName);
//                if (client == null) {
//                    mav.addObject("message", "企业名称错误，不存在该企业!");
//                    mav.setViewName("fail");
//                    return mav;
//                } else {
//                    session.setAttribute("client", client);
//                    questionnaire.setClientId(client.getClientId());
//                }
//            }
//            questionnaire.setAuthor(newQuestionnaire.getAuthor());
//        }
//
//        // 更新页面3过来的数据
//        for (int i = 0; i < newQuestionnaire.getDeriveWastesList().size(); i++) {
//            if (questionnaire.getDeriveWastesList() == null || questionnaire.getDeriveWastesList().size() == 0) {
//                questionnaire.setDeriveWastesList(newQuestionnaire.getDeriveWastesList());
//                break;
//            }
//            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
//            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
//
//            deriveWastes.setName(newDeriveWastes.getName());
//            deriveWastes.setCode(newDeriveWastes.getCode());
//            deriveWastes.setFormType(newDeriveWastes.getFormType());
//            deriveWastes.setFormTypeDetail(newDeriveWastes.getFormTypeDetail());
//            deriveWastes.setSmellType(newDeriveWastes.getSmellType());
//            deriveWastes.setSmellTypeDetail(newDeriveWastes.getSmellTypeDetail());
//            deriveWastes.setSolubility(newDeriveWastes.getSolubility());
//            deriveWastes.setSolubilityDetail(newDeriveWastes.getSolubilityDetail());
//            deriveWastes.setIsLowTemp(newDeriveWastes.getIsLowTemp());
//            deriveWastes.setLowTemp(newDeriveWastes.getLowTemp());
//            deriveWastes.setSolubleTemp(newDeriveWastes.getSolubleTemp());
//            deriveWastes.setIsMixture(newDeriveWastes.getIsMixture());
//
//            // 更新混合物成分
//            List<MixingElement> newMixingElementList = newDeriveWastes.getMixingElementList();
//            List<MixingElement> oldMixingElementList = deriveWastes.getMixingElementList();
//            if (oldMixingElementList.size() == 0) {
//                oldMixingElementList = newMixingElementList;
//            } else if (newMixingElementList.size() > 0) {
//                // 更新原有元素的值
//                for (int j = 0; j < oldMixingElementList.size(); j++) {
//                    oldMixingElementList.get(j).setName(newMixingElementList.get(j).getName());
//                    oldMixingElementList.get(j).setMaximum(newMixingElementList.get(j).getMaximum());
//                    oldMixingElementList.get(j).setAverage(newMixingElementList.get(j).getAverage());
//                    oldMixingElementList.get(j).setMinimum(newMixingElementList.get(j).getMinimum());
//                }
//                // 添加新元素
//                for (int j = oldMixingElementList.size(); j < newMixingElementList.size(); j++) {
//                    oldMixingElementList.add(newMixingElementList.get(j));
//                }
//            }
//            // 更新敏感酸性组份
//            List<SensitiveElement> newSensitiveElementList = newDeriveWastes.getSensitiveElementList();
//            List<SensitiveElement> oldSensitiveElementList = deriveWastes.getSensitiveElementList();
//            if (oldSensitiveElementList.size() == 0) {
//                oldSensitiveElementList = newSensitiveElementList;
//            } else if (newSensitiveElementList.size() > 0) {
//                // 更新原有元素的值
//                for (int j = 0; j < oldSensitiveElementList.size(); j++) {
//                    oldSensitiveElementList.get(j).setChemicalType(newSensitiveElementList.get(j).getChemicalType());
//                    oldSensitiveElementList.get(j).setIsOrganic(newSensitiveElementList.get(j).getIsOrganic());
//                }
//                // 添加新元素
//                for (int j = oldSensitiveElementList.size(); j < newSensitiveElementList.size(); j++) {
//                    oldSensitiveElementList.add(newSensitiveElementList.get(j));
//                }
//            }
////            deriveWastes.setMixingElementList(newDeriveWastes.getMixingElementList());
////            deriveWastes.setSensitiveElementList(newDeriveWastes.getSensitiveElementList());
//        }
//        mav.addObject("questionnaire", questionnaire);
//        mav.setViewName("questionnaire2");
//        return mav;
//    }
//
//    @RequestMapping("thirdQuestionnaire")
//    public ModelAndView thirdQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
//        ModelAndView mav = new ModelAndView();
//        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//        // 更新数据
//        for (int i = 0; i < newQuestionnaire.getDeriveWastesList().size(); i++) {
//            if (questionnaire.getDeriveWastesList().size() == 0) {
//                questionnaire.setDeriveWastesList(newQuestionnaire.getDeriveWastesList());
//                break;
//            }
//            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
//            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
//            if (newDeriveWastes.getWasteCharacterList() != null) {
//                List<WasteCharacter> wasteCharacterList = new ArrayList<>();
//                for (WasteCharacter wasteCharacter : newDeriveWastes.getWasteCharacterList()) {
//                    if (wasteCharacter != null) wasteCharacterList.add(wasteCharacter);
//                }
//                deriveWastes.setWasteCharacterList(wasteCharacterList);
//            }
//            if (newDeriveWastes.getWasteProtectList() != null) {
//                List<WasteProtect> wasteProtectList = new ArrayList<>();
//                for (WasteProtect wasteProtect : newDeriveWastes.getWasteProtectList()) {
//                    if (wasteProtect != null) wasteProtectList.add(wasteProtect);
//                }
//
//                deriveWastes.setWasteProtectList(wasteProtectList);
//            }
//            deriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
//            deriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
//            deriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
//            deriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
//            deriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
//            deriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
//        }
//        // 设置原材料的编号，随机
//        if (newQuestionnaire.getRawWastesList().size() > 0) {
//            List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
//            List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
//            // 如果旧列表不为空
//            if (oldRawWastesList.size() > 0) {
//                for (int i = 0; i < oldRawWastesList.size(); i++) {
//                    newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
//                }
//            } else {
//                for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
//                    if (rawWastes != null) {
//                        rawWastes.setMaterialId(RandomUtil.getRandomFileName());
//                    }
//                }
//            }
//            questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
//        }
//        if (newQuestionnaire.getWasteProcessList().size() > 0) {
//
//            List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
//            List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
//            if (oldWasteProcessList.size() > 0) {
//                for (int i = 0; i < oldWasteProcessList.size(); i++) {
//                    // 将旧列表的id赋值到新列表
//                    newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
//                }
//            } else {
//                for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
//                    if (wasteProcess != null && wasteProcess.getProcessId() == null) {
//                        wasteProcess.setProcessId(RandomUtil.getRandomFileName());
//                    }
//                }
//            }
//            questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
//        }
//
//        // 特别关注的物质列表
//        List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
//        if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
//            for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
//                if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
//            }
//            // 更新
//            questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
//        }
//
//        // 遍历枚举数据，显示下拉框
//        List<String> formTypeStrList = new ArrayList<>();
//        for (FormType formType : FormType.values()) {
//            formTypeStrList.add(formType.getName());
//        }
//        List<String> smellTypeStrList = new ArrayList<>();
//        for (SmellType smellType : SmellType.values()) {
//            smellTypeStrList.add(smellType.getName());
//        }
//        List<String> solubilityStrList = new ArrayList<>();
//        for (Solubility solubility : Solubility.values()) {
//            solubilityStrList.add(solubility.getName());
//        }
//        mav.addObject("formTypeStrList", formTypeStrList);
//        mav.addObject("smellTypeStrList", smellTypeStrList);
//        mav.addObject("solubilityStrList", solubilityStrList);
//
//        if (questionnaire.getDeriveWastesList().size() > 0) {
//
//            mav.addObject("deriveWastesList", questionnaire.getDeriveWastesList());
//        }
//        mav.addObject("questionnaire", questionnaire);
//        mav.setViewName("questionnaire3");
//        return mav;
//    }
//
//    @RequestMapping("forthQuestionnaire")
//    public ModelAndView forthQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
//        ModelAndView mav = new ModelAndView();
//        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//        // 遍历新问卷对象的次生危废列表
//        List<DeriveWastes> newDeriveWastesList = newQuestionnaire.getDeriveWastesList();
//        for (DeriveWastes deriveWastes : newDeriveWastesList) {
//            deriveWastes.setId(RandomUtil.getRandomFileName());
//            // 对于此处更新混合物成分列表的操作，因迭代时删除发生错误故采取不删反增继续事务
//            List<MixingElement> newMixingElementList = new ArrayList<>();
//            for (MixingElement mixingElement : deriveWastes.getMixingElementList()) {
//                // 去除列表中为空的元素
//                if (mixingElement != null && !mixingElement.getName().equals("")) {
//                    mixingElement.setId(RandomUtil.getRandomFileName());
//                    newMixingElementList.add(mixingElement);
//                }
//            }
//            deriveWastes.setMixingElementList(newMixingElementList);
//            // 更新敏感酸性列表的id
//            if (deriveWastes.getSensitiveElementList() != null) {
//                for (SensitiveElement sensitiveElement : deriveWastes.getSensitiveElementList()) {
//                    sensitiveElement.setId(RandomUtil.getRandomFileName());
//                }
//            }
//        }
//
//        // 更新数据
//        for (int i = 0; i < newQuestionnaire.getDeriveWastesList().size(); i++) {
//            if (questionnaire.getDeriveWastesList().size() == 0) {
//                questionnaire.setDeriveWastesList(newQuestionnaire.getDeriveWastesList());
//                break;
//            }
//            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
//            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
//
//            deriveWastes.setName(newDeriveWastes.getName());
//            deriveWastes.setCode(newDeriveWastes.getCode());
//            deriveWastes.setFormType(newDeriveWastes.getFormType());
//            deriveWastes.setFormTypeDetail(newDeriveWastes.getFormTypeDetail());
//            deriveWastes.setSmellType(newDeriveWastes.getSmellType());
//            deriveWastes.setSmellTypeDetail(newDeriveWastes.getSmellTypeDetail());
//            deriveWastes.setSolubility(newDeriveWastes.getSolubility());
//            deriveWastes.setSolubilityDetail(newDeriveWastes.getSolubilityDetail());
//            deriveWastes.setIsLowTemp(newDeriveWastes.getIsLowTemp());
//            deriveWastes.setLowTemp(newDeriveWastes.getLowTemp());
//            deriveWastes.setSolubleTemp(newDeriveWastes.getSolubleTemp());
//            deriveWastes.setIsMixture(newDeriveWastes.getIsMixture());
//            // 更新混合物成分
//            List<MixingElement> newMixingElementList = newDeriveWastes.getMixingElementList();
//            List<MixingElement> oldMixingElementList = deriveWastes.getMixingElementList();
//            if (oldMixingElementList.size() == 0) {
//                oldMixingElementList = newMixingElementList;
//            } else if (newMixingElementList.size() > 0) {
//                // 更新原有元素的值
//                for (int j = 0; j < oldMixingElementList.size(); j++) {
//                    oldMixingElementList.get(j).setName(newMixingElementList.get(j).getName());
//                    oldMixingElementList.get(j).setMaximum(newMixingElementList.get(j).getMaximum());
//                    oldMixingElementList.get(j).setAverage(newMixingElementList.get(j).getAverage());
//                    oldMixingElementList.get(j).setMinimum(newMixingElementList.get(j).getMinimum());
//                }
//                // 添加新元素
//                for (int j = oldMixingElementList.size(); j < newMixingElementList.size(); j++) {
//                    oldMixingElementList.add(newMixingElementList.get(j));
//                }
//            }
//            // 更新敏感酸性组份
//            List<SensitiveElement> newSensitiveElementList = newDeriveWastes.getSensitiveElementList();
//            List<SensitiveElement> oldSensitiveElementList = deriveWastes.getSensitiveElementList();
//            if (oldSensitiveElementList.size() == 0) {
//                oldSensitiveElementList = newSensitiveElementList;
//            } else if (newSensitiveElementList.size() > 0) {
//                // 更新原有元素的值
//                for (int j = 0; j < oldSensitiveElementList.size(); j++) {
//                    oldSensitiveElementList.get(j).setChemicalType(newSensitiveElementList.get(j).getChemicalType());
//                    oldSensitiveElementList.get(j).setIsOrganic(newSensitiveElementList.get(j).getIsOrganic());
//                }
//                // 添加新元素
//                for (int j = oldSensitiveElementList.size(); j < newSensitiveElementList.size(); j++) {
//                    oldSensitiveElementList.add(newSensitiveElementList.get(j));
//                }
//            }
//
//
////            deriveWastes.setMixingElementList(newDeriveWastes.getMixingElementList());
////            deriveWastes.setSensitiveElementList(newDeriveWastes.getSensitiveElementList());
//        }
//
//        mav.addObject("deriveWastesList", questionnaire.getDeriveWastesList());
//        mav.addObject("questionnaire", questionnaire);
//        // 此处根据session中的isUpdate来进行不同的跳转
//        if (session.getAttribute("isUpdate") == true) mav.setViewName("questionnaire5");
//        else mav.setViewName("questionnaire4");
//        return mav;
//    }

    @RequestMapping("listAllQuestionnaire")
    public ModelAndView listAllQuestionnaire() {
        ModelAndView mav = new ModelAndView();
        // 取出所有的调查表
        List<QuestionnaireAdmin> questionnaireAdminList = questionnaireService.listQuestionnaireAdmin();
        mav.addObject("questionnaireAdminList", questionnaireAdminList);
        mav.setViewName("assessmentAdmin");
        return mav;
    }

    /**
     * 签收问卷
     *
     * @param questionnaireId
     * @return
     */
    @RequestMapping("signInQuestionnaire")
    @ResponseBody
    public String signInQuestionnaire(String questionnaireId) {
        JSONObject res = new JSONObject();
        try {
            questionnaireService.signIn(questionnaireId);
            res.put("status", "success");
            res.put("message", "签收成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "签收失败!");
            res.put("stackTrace", e.getStackTrace());
        }
        return res.toString();
    }

    /**
     * 退回问卷
     *
     * @param questionnaireId
     * @return
     */
    @RequestMapping("backQuestionnaire")
    @ResponseBody
    public String backQuestionnaire(String questionnaireId) {
        JSONObject res = new JSONObject();
        try {
            questionnaireService.back(questionnaireId);
            res.put("status", "success");
            res.put("message", "签收成功!");
        } catch (Exception e) {
            e.printStackTrace();
            res.put("status", "fail");
            res.put("message", "签收失败!");
            res.put("stackTrace", e.getStackTrace());
        }
        return res.toString();
    }
}

//    @RequestMapping("updateQuestionnaire")
//    public ModelAndView updateQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
//        ModelAndView mav = new ModelAndView();
//
//        // 从session中获取
//        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
//        // 更新数据
////        for (int i = 0; i < questionnaire.getDeriveWastesList().size() && i < newQuestionnaire.getDeriveWastesList().size(); i++) {
////            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
////            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
////            if (newDeriveWastes.getWasteCharacterList() != null) {
////                List<WasteCharacter> wasteCharacterList = new ArrayList<>();
////                for (WasteCharacter wasteCharacter : newDeriveWastes.getWasteCharacterList()) {
////                    if (wasteCharacter != null) wasteCharacterList.add(wasteCharacter);
////                }
////                deriveWastes.setWasteCharacterList(wasteCharacterList);
////            }
////            if (newDeriveWastes.getWasteProtectList() != null) {
////                List<WasteProtect> wasteProtectList = new ArrayList<>();
////                for (WasteProtect wasteProtect : newDeriveWastes.getWasteProtectList()) {
////                    if (wasteProtect != null) wasteProtectList.add(wasteProtect);
////                }
////                deriveWastes.setWasteProtectList(wasteProtectList);
////            }
////            deriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
////            deriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
////            deriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
////            deriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
////            deriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
////            deriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
////        }
////        // 添加调查表
////        questionnaireService.update(questionnaire);
////        // 添加调查表中的原材料
////        for (RawWastes rawWastes : questionnaire.getRawWastesList()) {
////            rawWastesService.update(rawWastes);
////        }
////        // 添加调查表中的处理流程
////        for (WasteProcess wasteProcess : questionnaire.getWasteProcessList()) {
////            wasteProcessService.update(wasteProcess);
////        }
////        // 添加调查表中的次生危废
////        for (DeriveWastes wastes : questionnaire.getDeriveWastesList()) {
////            deriveWastesService.update(wastes);
////            if (wastes.getMixingElementList() != null)
////                for (MixingElement mixingElement : wastes.getMixingElementList()) {
////                    mixingElementService.update(mixingElement);
////                }
////            if (wastes.getSensitiveElementList() != null)
////                for (SensitiveElement sensitiveElement : wastes.getSensitiveElementList()) {
////                    sensitiveElementService.update(sensitiveElement);
////                }
////        }
////        mav.addObject("questionnaire", questionnaire);
////        mav.addObject("message", "修改调查表成功！");
////        mav.setViewName("success");
////
////        return mav;
////    }
//
////    @RequestMapping("addQuestionnaireFiles")
////    public ModelAndView addQuestionnaireFiles(Questionnaire newQuestionnaire) {
////        ModelAndView mav = new ModelAndView();
////        // 取得附件，并上传至服务器
////        if (newQuestionnaire.getAttachment() != null && !newQuestionnaire.getAttachment().getOriginalFilename().equals("")) {
////            String filename = newQuestionnaire.getAttachment().getOriginalFilename();
////
////            File file = new File("file/" + filename);
////            file.getParentFile().mkdirs();
////            if (file.exists()) file.delete();
////            try {
////                newQuestionnaire.getAttachment().transferTo(file);
////            } catch (IOException e) {
////                e.printStackTrace();
////            }
////            // 设置文件的路径
////            Questionnaire questionnaire = questionnaireService.getById(newQuestionnaire.getQuestionnaireId());
////            questionnaire.setAttachmentUrl(filename);
////            // 更新文件路径
////            questionnaireService.updateAttachmentUrl(questionnaire);
////        }
////        mav.addObject("message", "上传附件成功");
////        mav.setViewName("success");
////        return mav;
////    }
////}
//    }