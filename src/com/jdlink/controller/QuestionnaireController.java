package com.jdlink.controller;

import com.jdlink.domain.*;
import com.jdlink.service.*;
import com.jdlink.util.RandomUtil;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by matt on 2018/4/28.
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

    @RequestMapping("listQuestionnaire")
    public ModelAndView listQuestionnaire(HttpSession session) {
        ModelAndView mav = new ModelAndView();
        try {
            // 通过session获取到客户编号clientId
            Client client = (Client) session.getAttribute("client");
            List<Questionnaire> questionnaireList = questionnaireService.getByClientId(client.getClientId());
            mav.addObject("questionnaireList", questionnaireList);
            mav.addObject("client", client);
            mav.setViewName("assessment");
        } catch (Exception e) {
            mav.addObject("message", "用户信息获取失败，请重新登录");
            mav.setViewName("fail");
        }

        return mav;
    }

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

    @RequestMapping("getQuestionnaire")
    public ModelAndView getQuestionnaire(HttpSession session, String questionnaireId) {
        ModelAndView mav = new ModelAndView();
        try {
            // 通过session获取到客户编号clientId
            Client client = (Client) session.getAttribute("client");
            String clientId = client.getClientId();
            List<Questionnaire> questionnaireList = questionnaireService.get(clientId, questionnaireId);
            mav.addObject("questionnaireList", questionnaireList);
            mav.addObject("client", client);
            mav.setViewName("assessment");
        } catch (Exception e) {
            e.printStackTrace();
            mav.addObject("message", "查询失败！");
            mav.setViewName("fail");
        }
        return mav;
    }

    @RequestMapping("addQuestionnaire")
    public ModelAndView addQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
        // TODO: 当前增加调查表仅支持单个材料，多个材料后期完善
        ModelAndView mav = new ModelAndView();
        // 从session中获取
        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
        // 更新数据
        for (int i = 0; i < questionnaire.getDeriveWastesList().size() && i < newQuestionnaire.getDeriveWastesList().size(); i++) {
            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
            if (newDeriveWastes.getWasteCharacterList() != null) {
                List<WasteCharacter> wasteCharacterList = new ArrayList<>();
                for (WasteCharacter wasteCharacter : newDeriveWastes.getWasteCharacterList()) {
                    if (wasteCharacter != null) wasteCharacterList.add(wasteCharacter);
                }
                deriveWastes.setWasteCharacterList(wasteCharacterList);
            }
            if (newDeriveWastes.getWasteProtectList() != null) {
                List<WasteProtect> wasteProtectList = new ArrayList<>();
                for (WasteProtect wasteProtect : newDeriveWastes.getWasteProtectList()) {
                    if (wasteProtect != null) wasteProtectList.add(wasteProtect);
                }
                deriveWastes.setWasteProtectList(wasteProtectList);
            }
            deriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
            deriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
            deriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
            deriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
            deriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
            deriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
        }

        // 添加调查表
        questionnaireService.add(questionnaire);
        // 添加调查表中的原材料
        for (RawWastes rawWastes : questionnaire.getRawWastesList()) {
            rawWastesService.add(rawWastes);
        }
        // 添加调查表中的处理流程
        for (WasteProcess wasteProcess : questionnaire.getWasteProcessList()) {
            wasteProcessService.add(wasteProcess);
        }
        // 添加调查表中的次生危废
        for (DeriveWastes wastes : questionnaire.getDeriveWastesList()) {
            deriveWastesService.add(wastes);
            if (wastes.getMixingElementList() != null)
            for (MixingElement mixingElement : wastes.getMixingElementList()) {
                mixingElementService.add(mixingElement);
            }
            if (wastes.getSensitiveElementList() != null)
            for (SensitiveElement sensitiveElement : wastes.getSensitiveElementList()) {
                sensitiveElementService.add(sensitiveElement);
            }
        }
        mav.addObject("questionnaire", questionnaire);
        mav.addObject("message", "新增调查表成功！");
        mav.setViewName("success");

        return mav;
    }

    @RequestMapping("showQuestionnaire")
    public ModelAndView showQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();
        // 第一次进入清空session
        session.removeAttribute("questionnaire");
        session.removeAttribute("isUpdate");
        // 获取用户
        Client client = (Client) session.getAttribute("client");
        if (client != null) {
            mav.addObject("client", client);
        }
        mav.setViewName("questionnaire1");
        // 如果存在问卷编号
        if (session.getAttribute("questionnaire") == null) {
            Questionnaire questionnaire = new Questionnaire();
            if (newQuestionnaire.getQuestionnaireId() == null) {
                // 创建调查表数据对象
                questionnaire.setTime(new Date()); // 获取当前时间
                questionnaire.setClientId(client.getClientId());
                questionnaire.setQuestionnaireId(RandomUtil.getRandomFileName());
            } else {
                // 设置页面为更新进入
                session.setAttribute("isUpdate", true);
                // TODO: 优化部分，后期有时间将其get统一整合进 "questionnaire.xml"
                // 取得调查表对象
                questionnaire = questionnaireService.getById(newQuestionnaire.getQuestionnaireId());
                // 装载原材料
                questionnaire.setRawWastesList(rawWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
                // 装载处理流程
                questionnaire.setWasteProcessList(wasteProcessService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
                // 装载次生危废
                questionnaire.setDeriveWastesList(deriveWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
            }
            // 添加session
            session.setAttribute("questionnaire", questionnaire);

            mav.addObject("questionnaire", questionnaire);
        } else {
            Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
            // 更新页面2传递过来的数据
//            if (newQuestionnaire.getRawWastesList().size() > 0) {
//                for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
//                    if (rawWastes != null && rawWastes.getMaterialId() == null) {
//                        rawWastes.setMaterialId(RandomUtil.getRandomFileName());
//                    }
//                }
//                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
//            }
//            if (newQuestionnaire.getWasteProcessList().size() > 0) {
//                for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
//                    if (wasteProcess != null && wasteProcess.getProcessId() == null) {
//                        wasteProcess.setProcessId(RandomUtil.getRandomFileName());
//                    }
//                }
//                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
//            }
            // 特别关注的物质列表

            if (newQuestionnaire.getRawWastesList().size() > 0) {
                List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
                List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
                // 如果旧列表不为空
                if (oldRawWastesList.size() > 0) {
                    for (int i = 0; i < oldRawWastesList.size(); i++) {
                        newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
                    }
                } else {
                    for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
                        if (rawWastes != null) {
                            rawWastes.setMaterialId(RandomUtil.getRandomFileName());
                        }
                    }
                }
                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
            }
            if (newQuestionnaire.getWasteProcessList().size() > 0) {

                List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
                List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
                if (oldWasteProcessList.size() > 0) {
                    for (int i = 0; i < oldWasteProcessList.size(); i++) {
                        // 将旧列表的id赋值到新列表
                        newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
                    }
                } else {
                    for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
                        if (wasteProcess != null && wasteProcess.getProcessId() == null) {
                            wasteProcess.setProcessId(RandomUtil.getRandomFileName());
                        }
                    }
                }
                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
            }

            List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
            if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
                for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
                    if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
                }
                // 更新
                questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
            }
            mav.addObject("questionnaire", questionnaire);
        }
        return mav;
    }

    @RequestMapping("showQuestionnaireAdmin")
    public ModelAndView showQuestionnaireAdmin(HttpSession session, Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();
        // 第一次进入清空session
        session.removeAttribute("questionnaire");
        session.removeAttribute("isUpdate");
        session.removeAttribute("client");
        mav.setViewName("questionnaire1");
        // 如果存在问卷编号
        if (session.getAttribute("questionnaire") == null) {
            Questionnaire questionnaire = new Questionnaire();
            if (newQuestionnaire.getQuestionnaireId() == null) {
                // 创建调查表数据对象
                questionnaire.setTime(new Date()); // 获取当前时间
                questionnaire.setQuestionnaireId(RandomUtil.getRandomFileName());
            } else {
                // 设置页面为更新进入
                session.setAttribute("isUpdate", true);
                // TODO: 优化部分，后期有时间将其get统一整合进 "questionnaire.xml"
                // 取得调查表对象
                questionnaire = questionnaireService.getById(newQuestionnaire.getQuestionnaireId());
                // 装载原材料
                questionnaire.setRawWastesList(rawWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
                // 装载处理流程
                questionnaire.setWasteProcessList(wasteProcessService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
                // 装载次生危废
                questionnaire.setDeriveWastesList(deriveWastesService.getByQuestionnaireId(newQuestionnaire.getQuestionnaireId()));
            }
            // 添加session
            session.setAttribute("questionnaire", questionnaire);

            mav.addObject("questionnaire", questionnaire);
        } else {
            Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
            // 更新页面2传递过来的数据
//            if (newQuestionnaire.getRawWastesList().size() > 0) {
//                for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
//                    if (rawWastes != null && rawWastes.getMaterialId() == null) {
//                        rawWastes.setMaterialId(RandomUtil.getRandomFileName());
//                    }
//                }
//                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
//            }
//            if (newQuestionnaire.getWasteProcessList().size() > 0) {
//                for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
//                    if (wasteProcess != null && wasteProcess.getProcessId() == null) {
//                        wasteProcess.setProcessId(RandomUtil.getRandomFileName());
//                    }
//                }
//                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
//            }
            // 特别关注的物质列表

            if (newQuestionnaire.getRawWastesList().size() > 0) {
                List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
                List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
                // 如果旧列表不为空
                if (oldRawWastesList.size() > 0) {
                    for (int i = 0; i < oldRawWastesList.size(); i++) {
                        newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
                    }
                } else {
                    for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
                        if (rawWastes != null) {
                            rawWastes.setMaterialId(RandomUtil.getRandomFileName());
                        }
                    }
                }
                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
            }
            if (newQuestionnaire.getWasteProcessList().size() > 0) {

                List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
                List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
                if (oldWasteProcessList.size() > 0) {
                    for (int i = 0; i < oldWasteProcessList.size(); i++) {
                        // 将旧列表的id赋值到新列表
                        newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
                    }
                } else {
                    for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
                        if (wasteProcess != null && wasteProcess.getProcessId() == null) {
                            wasteProcess.setProcessId(RandomUtil.getRandomFileName());
                        }
                    }
                }
                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
            }

            List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
            if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
                for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
                    if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
                }
                // 更新
                questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
            }
            mav.addObject("questionnaire", questionnaire);
        }
        return mav;
    }

    @RequestMapping("firstQuestionnaire")
    public ModelAndView firstQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();
        // 获取用户
        Client client = (Client) session.getAttribute("client");
        mav.addObject("client", client);
        mav.setViewName("questionnaire1");
        // 如果存在问卷编号
        if (session.getAttribute("questionnaire") == null) {
            Questionnaire questionnaire = new Questionnaire();
            if (newQuestionnaire.getQuestionnaireId() == null) {
                // 创建调查表数据对象
                questionnaire.setTime(new Date()); // 获取当前时间
                questionnaire.setClientId(client.getClientId());
                questionnaire.setQuestionnaireId(RandomUtil.getRandomFileName());
            } else {
                List<Questionnaire> questionnaireList = questionnaireService.get(client.getClientId(), newQuestionnaire.getQuestionnaireId());
                questionnaire = questionnaireList.get(0);
            }

            session.setAttribute("questionnaire", questionnaire);
        } else {
            Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");

            // 更新页面2传递过来的数据
            // 设置原材料的编号
            // 保持新旧两个列表的元素id一致
            // 设置原材料的编号，随机
            if (newQuestionnaire.getRawWastesList().size() > 0) {
                List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
                List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
                // 如果旧列表不为空
                if (oldRawWastesList.size() > 0) {
                    for (int i = 0; i < oldRawWastesList.size(); i++) {
                        newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
                    }
                } else {
                    for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
                        if (rawWastes != null) {
                            rawWastes.setMaterialId(RandomUtil.getRandomFileName());
                        }
                    }
                }
                questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
            }
            if (newQuestionnaire.getWasteProcessList().size() > 0) {

                List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
                List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
                if (oldWasteProcessList.size() > 0) {
                    for (int i = 0; i < oldWasteProcessList.size(); i++) {
                        // 将旧列表的id赋值到新列表
                        newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
                    }
                } else {
                    for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
                        if (wasteProcess != null && wasteProcess.getProcessId() == null) {
                            wasteProcess.setProcessId(RandomUtil.getRandomFileName());
                        }
                    }
                }
                questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
            }

            // 特别关注的物质列表
            List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
            if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
                for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
                    if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
                }
                // 更新
                questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
            }

            mav.addObject("questionnaire", questionnaire);
        }
        return mav;
    }

    @RequestMapping("secondQuestionnaire")
    public ModelAndView secondQuestionnaire(HttpSession session, Questionnaire newQuestionnaire, String companyName) {
        ModelAndView mav = new ModelAndView();
        // 获取调查表对象
        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");

        // 更新填表人
        if (newQuestionnaire.getAuthor() != null) {
            // 处理session不存在client信息的情况
            if (session.getAttribute("client") == null) {
                Client client = clientService.getByName(companyName);
                if (client == null) {
                    mav.addObject("message", "企业名称错误，不存在该企业!");
                    mav.setViewName("fail");
                    return mav;
                } else {
                    session.setAttribute("client", client);
                    questionnaire.setClientId(client.getClientId());
                }
            }
            questionnaire.setAuthor(newQuestionnaire.getAuthor());
        }

        // 更新页面3过来的数据
        for (int i = 0; i < newQuestionnaire.getDeriveWastesList().size(); i++) {
            if (questionnaire.getDeriveWastesList() == null || questionnaire.getDeriveWastesList().size() == 0) {
                questionnaire.setDeriveWastesList(newQuestionnaire.getDeriveWastesList());
                break;
            }
            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);

            deriveWastes.setName(newDeriveWastes.getName());
            deriveWastes.setCode(newDeriveWastes.getCode());
            deriveWastes.setFormType(newDeriveWastes.getFormType());
            deriveWastes.setFormTypeDetail(newDeriveWastes.getFormTypeDetail());
            deriveWastes.setSmellType(newDeriveWastes.getSmellType());
            deriveWastes.setSmellTypeDetail(newDeriveWastes.getSmellTypeDetail());
            deriveWastes.setSolubility(newDeriveWastes.getSolubility());
            deriveWastes.setSolubilityDetail(newDeriveWastes.getSolubilityDetail());
            deriveWastes.setIsLowTemp(newDeriveWastes.getIsLowTemp());
            deriveWastes.setLowTemp(newDeriveWastes.getLowTemp());
            deriveWastes.setSolubleTemp(newDeriveWastes.getSolubleTemp());
            deriveWastes.setIsMixture(newDeriveWastes.getIsMixture());

            // 更新混合物成分
            List<MixingElement> newMixingElementList = newDeriveWastes.getMixingElementList();
            List<MixingElement> oldMixingElementList = deriveWastes.getMixingElementList();
            if (oldMixingElementList.size() == 0) {
                oldMixingElementList = newMixingElementList;
            } else if (newMixingElementList.size() > 0) {
                // 更新原有元素的值
                for (int j = 0; j < oldMixingElementList.size(); j++) {
                    oldMixingElementList.get(j).setName(newMixingElementList.get(j).getName());
                    oldMixingElementList.get(j).setMaximum(newMixingElementList.get(j).getMaximum());
                    oldMixingElementList.get(j).setAverage(newMixingElementList.get(j).getAverage());
                    oldMixingElementList.get(j).setMinimum(newMixingElementList.get(j).getMinimum());
                }
                // 添加新元素
                for (int j = oldMixingElementList.size(); j < newMixingElementList.size(); j++) {
                    oldMixingElementList.add(newMixingElementList.get(j));
                }
            }
            // 更新敏感酸性组份
            List<SensitiveElement> newSensitiveElementList = newDeriveWastes.getSensitiveElementList();
            List<SensitiveElement> oldSensitiveElementList = deriveWastes.getSensitiveElementList();
            if (oldSensitiveElementList.size() == 0) {
                oldSensitiveElementList = newSensitiveElementList;
            } else if (newSensitiveElementList.size() > 0) {
                // 更新原有元素的值
                for (int j = 0; j < oldSensitiveElementList.size(); j++) {
                    oldSensitiveElementList.get(j).setChemicalType(newSensitiveElementList.get(j).getChemicalType());
                    oldSensitiveElementList.get(j).setIsOrganic(newSensitiveElementList.get(j).getIsOrganic());
                }
                // 添加新元素
                for (int j = oldSensitiveElementList.size(); j < newSensitiveElementList.size(); j++) {
                    oldSensitiveElementList.add(newSensitiveElementList.get(j));
                }
            }
//            deriveWastes.setMixingElementList(newDeriveWastes.getMixingElementList());
//            deriveWastes.setSensitiveElementList(newDeriveWastes.getSensitiveElementList());
        }
        mav.addObject("questionnaire", questionnaire);
        mav.setViewName("questionnaire2");
        return mav;
    }

    @RequestMapping("thirdQuestionnaire")
    public ModelAndView thirdQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();
        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
        // 更新数据
        for (int i = 0; i < newQuestionnaire.getDeriveWastesList().size(); i++) {
            if (questionnaire.getDeriveWastesList().size() == 0) {
                questionnaire.setDeriveWastesList(newQuestionnaire.getDeriveWastesList());
                break;
            }
            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
            if (newDeriveWastes.getWasteCharacterList() != null) {
                List<WasteCharacter> wasteCharacterList = new ArrayList<>();
                for (WasteCharacter wasteCharacter : newDeriveWastes.getWasteCharacterList()) {
                    if (wasteCharacter != null) wasteCharacterList.add(wasteCharacter);
                }
                deriveWastes.setWasteCharacterList(wasteCharacterList);
            }
            if (newDeriveWastes.getWasteProtectList() != null) {
                List<WasteProtect> wasteProtectList = new ArrayList<>();
                for (WasteProtect wasteProtect : newDeriveWastes.getWasteProtectList()) {
                    if (wasteProtect != null) wasteProtectList.add(wasteProtect);
                }

                deriveWastes.setWasteProtectList(wasteProtectList);
            }
            deriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
            deriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
            deriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
            deriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
            deriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
            deriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
        }
        // 设置原材料的编号，随机
        if (newQuestionnaire.getRawWastesList().size() > 0) {
            List<RawWastes> oldRawWastesList = questionnaire.getRawWastesList();
            List<RawWastes> newRawWastesList = newQuestionnaire.getRawWastesList();
            // 如果旧列表不为空
            if (oldRawWastesList.size() > 0) {
                for (int i = 0; i < oldRawWastesList.size(); i++) {
                    newRawWastesList.get(i).setMaterialId(oldRawWastesList.get(i).getMaterialId());
                }
            } else {
                for (RawWastes rawWastes : newQuestionnaire.getRawWastesList()) {
                    if (rawWastes != null) {
                        rawWastes.setMaterialId(RandomUtil.getRandomFileName());
                    }
                }
            }
            questionnaire.setRawWastesList(newQuestionnaire.getRawWastesList());
        }
        if (newQuestionnaire.getWasteProcessList().size() > 0) {

            List<WasteProcess> oldWasteProcessList = questionnaire.getWasteProcessList();
            List<WasteProcess> newWasteProcessList = newQuestionnaire.getWasteProcessList();
            if (oldWasteProcessList.size() > 0) {
                for (int i = 0; i < oldWasteProcessList.size(); i++) {
                    // 将旧列表的id赋值到新列表
                    newWasteProcessList.get(i).setProcessId(oldWasteProcessList.get(i).getProcessId());
                }
            } else {
                for (WasteProcess wasteProcess : newQuestionnaire.getWasteProcessList()) {
                    if (wasteProcess != null && wasteProcess.getProcessId() == null) {
                        wasteProcess.setProcessId(RandomUtil.getRandomFileName());
                    }
                }
            }
            questionnaire.setWasteProcessList(newQuestionnaire.getWasteProcessList());
        }

        // 特别关注的物质列表
        List<WasteInclusionType> wasteInclusionTypeList = new ArrayList<>();
        if (newQuestionnaire.getWasteInclusionTypeList() != null && newQuestionnaire.getWasteInclusionTypeList().size() > 0) {
            for (WasteInclusionType wasteInclusionType : newQuestionnaire.getWasteInclusionTypeList()) {
                if (wasteInclusionType != null) wasteInclusionTypeList.add(wasteInclusionType);
            }
            // 更新
            questionnaire.setWasteInclusionTypeList(wasteInclusionTypeList);
        }

        // 遍历枚举数据，显示下拉框
        List<String> formTypeStrList = new ArrayList<>();
        for (FormType formType : FormType.values()) {
            formTypeStrList.add(formType.getName());
        }
        List<String> smellTypeStrList = new ArrayList<>();
        for (SmellType smellType : SmellType.values()) {
            smellTypeStrList.add(smellType.getName());
        }
        List<String> solubilityStrList = new ArrayList<>();
        for (Solubility solubility : Solubility.values()) {
            solubilityStrList.add(solubility.getName());
        }
        mav.addObject("formTypeStrList", formTypeStrList);
        mav.addObject("smellTypeStrList", smellTypeStrList);
        mav.addObject("solubilityStrList", solubilityStrList);

        if (questionnaire.getDeriveWastesList().size() > 0) {

            mav.addObject("deriveWastesList", questionnaire.getDeriveWastesList());
        }
        mav.addObject("questionnaire", questionnaire);
        mav.setViewName("questionnaire3");
        return mav;
    }

    @RequestMapping("forthQuestionnaire")
    public ModelAndView forthQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();
        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
        // 遍历新问卷对象的次生危废列表
        List<DeriveWastes> newDeriveWastesList = newQuestionnaire.getDeriveWastesList();
        for (DeriveWastes deriveWastes : newDeriveWastesList) {
            deriveWastes.setId(RandomUtil.getRandomFileName());
            // 对于此处更新混合物成分列表的操作，因迭代时删除发生错误故采取不删反增继续事务
            List<MixingElement> newMixingElementList = new ArrayList<>();
            for (MixingElement mixingElement : deriveWastes.getMixingElementList()) {
                // 去除列表中为空的元素
                if (mixingElement != null && !mixingElement.getName().equals("")) {
                    mixingElement.setId(RandomUtil.getRandomFileName());
                    newMixingElementList.add(mixingElement);
                }
            }
            deriveWastes.setMixingElementList(newMixingElementList);
            // 更新敏感酸性列表的id
            if (deriveWastes.getSensitiveElementList() != null) {
                for (SensitiveElement sensitiveElement : deriveWastes.getSensitiveElementList()) {
                    sensitiveElement.setId(RandomUtil.getRandomFileName());
                }
            }
        }

        // 更新数据
        for (int i = 0; i < newQuestionnaire.getDeriveWastesList().size(); i++) {
            if (questionnaire.getDeriveWastesList().size() == 0) {
                questionnaire.setDeriveWastesList(newQuestionnaire.getDeriveWastesList());
                break;
            }
            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);

            deriveWastes.setName(newDeriveWastes.getName());
            deriveWastes.setCode(newDeriveWastes.getCode());
            deriveWastes.setFormType(newDeriveWastes.getFormType());
            deriveWastes.setFormTypeDetail(newDeriveWastes.getFormTypeDetail());
            deriveWastes.setSmellType(newDeriveWastes.getSmellType());
            deriveWastes.setSmellTypeDetail(newDeriveWastes.getSmellTypeDetail());
            deriveWastes.setSolubility(newDeriveWastes.getSolubility());
            deriveWastes.setSolubilityDetail(newDeriveWastes.getSolubilityDetail());
            deriveWastes.setIsLowTemp(newDeriveWastes.getIsLowTemp());
            deriveWastes.setLowTemp(newDeriveWastes.getLowTemp());
            deriveWastes.setSolubleTemp(newDeriveWastes.getSolubleTemp());
            deriveWastes.setIsMixture(newDeriveWastes.getIsMixture());
            // 更新混合物成分
            List<MixingElement> newMixingElementList = newDeriveWastes.getMixingElementList();
            List<MixingElement> oldMixingElementList = deriveWastes.getMixingElementList();
            if (oldMixingElementList.size() == 0) {
                oldMixingElementList = newMixingElementList;
            } else if (newMixingElementList.size() > 0) {
                // 更新原有元素的值
                for (int j = 0; j < oldMixingElementList.size(); j++) {
                    oldMixingElementList.get(j).setName(newMixingElementList.get(j).getName());
                    oldMixingElementList.get(j).setMaximum(newMixingElementList.get(j).getMaximum());
                    oldMixingElementList.get(j).setAverage(newMixingElementList.get(j).getAverage());
                    oldMixingElementList.get(j).setMinimum(newMixingElementList.get(j).getMinimum());
                }
                // 添加新元素
                for (int j = oldMixingElementList.size(); j < newMixingElementList.size(); j++) {
                    oldMixingElementList.add(newMixingElementList.get(j));
                }
            }
            // 更新敏感酸性组份
            List<SensitiveElement> newSensitiveElementList = newDeriveWastes.getSensitiveElementList();
            List<SensitiveElement> oldSensitiveElementList = deriveWastes.getSensitiveElementList();
            if (oldSensitiveElementList.size() == 0) {
                oldSensitiveElementList = newSensitiveElementList;
            } else if (newSensitiveElementList.size() > 0) {
                // 更新原有元素的值
                for (int j = 0; j < oldSensitiveElementList.size(); j++) {
                    oldSensitiveElementList.get(j).setChemicalType(newSensitiveElementList.get(j).getChemicalType());
                    oldSensitiveElementList.get(j).setIsOrganic(newSensitiveElementList.get(j).getIsOrganic());
                }
                // 添加新元素
                for (int j = oldSensitiveElementList.size(); j < newSensitiveElementList.size(); j++) {
                    oldSensitiveElementList.add(newSensitiveElementList.get(j));
                }
            }


//            deriveWastes.setMixingElementList(newDeriveWastes.getMixingElementList());
//            deriveWastes.setSensitiveElementList(newDeriveWastes.getSensitiveElementList());
        }

        mav.addObject("deriveWastesList", questionnaire.getDeriveWastesList());
        mav.addObject("questionnaire", questionnaire);
        // 此处根据session中的isUpdate来进行不同的跳转
        if (session.getAttribute("isUpdate") == true) mav.setViewName("questionnaire5");
        else mav.setViewName("questionnaire4");
        return mav;
    }

    @RequestMapping("listAllQuestionnaire")
    public ModelAndView listAllQuestionnaire() {
        ModelAndView mav = new ModelAndView();
        // 取出所有的调查表
        List<QuestionnaireAdmin> questionnaireAdminList = questionnaireService.listQuestionnaireAdmin();
        mav.addObject("questionnaireAdminList", questionnaireAdminList);
        mav.setViewName("assessmentAdmin");
        return mav;
    }

    @RequestMapping("signInQuestionnaire")
    public ModelAndView signInQuestionnaire(String questionnaireId) {
        ModelAndView mav = new ModelAndView();
        try {
            questionnaireService.signIn(questionnaireId);
            return listAllQuestionnaire();
        } catch (Exception e) {
            e.printStackTrace();
            mav.addObject("message", "签收失败!");
            mav.setViewName("fail");
        }
        return mav;
    }

    @RequestMapping("backQuestionnaire")
    public ModelAndView backQuestionnaire(String questionnaireId) {
        ModelAndView mav = new ModelAndView();
        try {
            questionnaireService.back(questionnaireId);
            return listAllQuestionnaire();
        } catch (Exception e) {
            e.printStackTrace();
            mav.addObject("message", "退回失败!");
            mav.setViewName("fail");
        }
        return mav;
    }

    @RequestMapping("updateQuestionnaire")
    public ModelAndView updateQuestionnaire(HttpSession session, Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();

        // 从session中获取
        Questionnaire questionnaire = (Questionnaire) session.getAttribute("questionnaire");
        // 更新数据
        for (int i = 0; i < questionnaire.getDeriveWastesList().size() && i < newQuestionnaire.getDeriveWastesList().size(); i++) {
            DeriveWastes newDeriveWastes = newQuestionnaire.getDeriveWastesList().get(i);
            DeriveWastes deriveWastes = questionnaire.getDeriveWastesList().get(i);
            if (newDeriveWastes.getWasteCharacterList() != null) {
                List<WasteCharacter> wasteCharacterList = new ArrayList<>();
                for (WasteCharacter wasteCharacter : newDeriveWastes.getWasteCharacterList()) {
                    if (wasteCharacter != null) wasteCharacterList.add(wasteCharacter);
                }
                deriveWastes.setWasteCharacterList(wasteCharacterList);
            }
            if (newDeriveWastes.getWasteProtectList() != null) {
                List<WasteProtect> wasteProtectList = new ArrayList<>();
                for (WasteProtect wasteProtect : newDeriveWastes.getWasteProtectList()) {
                    if (wasteProtect != null) wasteProtectList.add(wasteProtect);
                }
                deriveWastes.setWasteProtectList(wasteProtectList);
            }
            deriveWastes.setEyeMeasures(newDeriveWastes.getEyeMeasures());
            deriveWastes.setSkinMeasures(newDeriveWastes.getSkinMeasures());
            deriveWastes.setSwallowMeasures(newDeriveWastes.getSwallowMeasures());
            deriveWastes.setSuctionMeasures(newDeriveWastes.getSuctionMeasures());
            deriveWastes.setPutOutFireMeasures(newDeriveWastes.getPutOutFireMeasures());
            deriveWastes.setLeakMeasures(newDeriveWastes.getLeakMeasures());
        }
        // 添加调查表
        questionnaireService.update(questionnaire);
        // 添加调查表中的原材料
        for (RawWastes rawWastes : questionnaire.getRawWastesList()) {
            rawWastesService.update(rawWastes);
        }
        // 添加调查表中的处理流程
        for (WasteProcess wasteProcess : questionnaire.getWasteProcessList()) {
            wasteProcessService.update(wasteProcess);
        }
        // 添加调查表中的次生危废
        for (DeriveWastes wastes : questionnaire.getDeriveWastesList()) {
            deriveWastesService.update(wastes);
            if (wastes.getMixingElementList() != null)
                for (MixingElement mixingElement : wastes.getMixingElementList()) {
                    mixingElementService.update(mixingElement);
                }
            if (wastes.getSensitiveElementList() != null)
                for (SensitiveElement sensitiveElement : wastes.getSensitiveElementList()) {
                    sensitiveElementService.update(sensitiveElement);
                }
        }
        mav.addObject("questionnaire", questionnaire);
        mav.addObject("message", "修改调查表成功！");
        mav.setViewName("success");

        return mav;
    }

    @RequestMapping("addQuestionnaireFiles")
    public ModelAndView addQuestionnaireFiles(Questionnaire newQuestionnaire) {
        ModelAndView mav = new ModelAndView();
        // 取得附件，并上传至服务器
        if (newQuestionnaire.getAttachment() != null && !newQuestionnaire.getAttachment().getOriginalFilename().equals("")) {
            String filename = newQuestionnaire.getAttachment().getOriginalFilename();

            File file = new File("file/" + filename);
            file.getParentFile().mkdirs();
            if (file.exists()) file.delete();
            try {
                newQuestionnaire.getAttachment().transferTo(file);
            } catch (IOException e) {
                e.printStackTrace();
            }
            // 设置文件的路径
            Questionnaire questionnaire = questionnaireService.getById(newQuestionnaire.getQuestionnaireId());
            questionnaire.setAttachmentUrl(filename);
            // 更新文件路径
            questionnaireService.updateAttachmentUrl(questionnaire);
        }
        mav.addObject("message", "上传附件成功");
        mav.setViewName("success");
        return mav;
    }
}
