package com.jdlink.domain;

import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/4/28.
 * 调查问卷
 */
public class Questionnaire {
    /**
     * 调查问卷编号
     */
    private String questionnaireId;
    /**
     * 客户
     */
    private Client client;
    /**
     * 评估表编号
     */
    private String evaluationnaireId;
    /**
     * 填写人
     */
    private String author;
    /**
     * 申请状态
     */
    private ApplyState applyState;
    /**
     * 原始危废
     */
    private List<RawWastes> rawWastesList = new ArrayList<>();
    /**
     * 特别关注的物质
     */
    private List<WasteInclusionType> wasteInclusionTypeList;
    /**
     * 处理流程
     */
    private List<WasteProcess> wasteProcessList = new ArrayList<>();
    /**
     * 次生危废
     */
    private List<DeriveWastes> deriveWastesList = new ArrayList<>();
    /**
     * 填写时间
     */
    private Date time;
    /**
     * 附件
     */
    private MultipartFile attachment;
    /**
     * 附件地址
     */
    private String attachmentUrl;
    /**
     * 调查问卷关键字
     */
    private String keyword;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
    private Page page;

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    private Boolean isMaterialComplete;

    private String notCompleteReason;

    private boolean isMeetRequire;

    private boolean isCooperate;

    private boolean isDedicate;

    private String acceptIntend1;

    private String wasteName1;

    private String wasteName2;

    private String wasteName3;

    private String wasteName4;

    private String wasteName5;

    private String wasteName6;

    private String otherRisk;

    private String acceptIntend2;

    private String unacceptReason2;

    private String conditionReason2;

    private boolean isStore;

    private String storeReason;

    private boolean isProcess;

    private String processReason;

    private String acceptIntend3;

    private String unacceptReason3;

    private String conditionReason3;

    private boolean isExamined;
    /**
     * 当前时间
     */
    private Date nowTime;

    @Override
    public String toString() {
        return "Questionnaire{" +
                "questionnaireId='" + questionnaireId + '\'' +
                ", client=" + client +
                ", evaluationnaireId='" + evaluationnaireId + '\'' +
                ", author='" + author + '\'' +
                ", applyState=" + applyState +
                ", rawWastesList=" + rawWastesList +
                ", wasteInclusionTypeList=" + wasteInclusionTypeList +
                ", wasteProcessList=" + wasteProcessList +
                ", deriveWastesList=" + deriveWastesList +
                ", time=" + time +
                ", attachment=" + attachment +
                ", attachmentUrl='" + attachmentUrl + '\'' +
                ", isMaterialComplete=" + isMaterialComplete +
                ", notCompleteReason='" + notCompleteReason + '\'' +
                ", isMeetRequire=" + isMeetRequire +
                ", isCooperate=" + isCooperate +
                ", isDedicate=" + isDedicate +
                ", acceptIntend1='" + acceptIntend1 + '\'' +
                ", wasteName1='" + wasteName1 + '\'' +
                ", wasteName2='" + wasteName2 + '\'' +
                ", wasteName3='" + wasteName3 + '\'' +
                ", wasteName4='" + wasteName4 + '\'' +
                ", wasteName5='" + wasteName5 + '\'' +
                ", wasteName6='" + wasteName6 + '\'' +
                ", otherRisk='" + otherRisk + '\'' +
                ", acceptIntend2='" + acceptIntend2 + '\'' +
                ", unacceptReason2='" + unacceptReason2 + '\'' +
                ", conditionReason2='" + conditionReason2 + '\'' +
                ", isStore=" + isStore +
                ", storeReason='" + storeReason + '\'' +
                ", isProcess=" + isProcess +
                ", processReason='" + processReason + '\'' +
                ", acceptIntend3='" + acceptIntend3 + '\'' +
                ", unacceptReason3='" + unacceptReason3 + '\'' +
                ", conditionReason3='" + conditionReason3 + '\'' +
                ", isExamined=" + isExamined +
                ", nowTime=" + nowTime +
                '}';
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getEvaluationnaireId() {
        return evaluationnaireId;
    }

    public void setEvaluationnaireId(String evaluationnaireId) {
        this.evaluationnaireId = evaluationnaireId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public ApplyState getApplyState() {
        return applyState;
    }

    public void setApplyState(ApplyState applyState) {
        this.applyState = applyState;
    }

    public List<RawWastes> getRawWastesList() {
        return rawWastesList;
    }

    public void setRawWastesList(List<RawWastes> rawWastesList) {
        this.rawWastesList = rawWastesList;
    }

    public List<WasteInclusionType> getWasteInclusionTypeList() {
        return wasteInclusionTypeList;
    }

    public void setWasteInclusionTypeList(List<WasteInclusionType> wasteInclusionTypeList) {
        this.wasteInclusionTypeList = wasteInclusionTypeList;
    }

    public List<WasteProcess> getWasteProcessList() {
        return wasteProcessList;
    }

    public void setWasteProcessList(List<WasteProcess> wasteProcessList) {
        this.wasteProcessList = wasteProcessList;
    }

    public List<DeriveWastes> getDeriveWastesList() {
        return deriveWastesList;
    }

    public void setDeriveWastesList(List<DeriveWastes> deriveWastesList) {
        this.deriveWastesList = deriveWastesList;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public MultipartFile getAttachment() {
        return attachment;
    }

    public void setAttachment(MultipartFile attachment) {
        this.attachment = attachment;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public Boolean getIsMaterialComplete() {
        return isMaterialComplete;
    }

    public void setIsMaterialComplete(Boolean materialComplete) {
        isMaterialComplete = materialComplete;
    }

    public String getNotCompleteReason() {
        return notCompleteReason;
    }

    public void setNotCompleteReason(String notCompleteReason) {
        this.notCompleteReason = notCompleteReason;
    }

    public boolean getIsMeetRequire() {
        return isMeetRequire;
    }

    public void setIsMeetRequire(boolean meetRequire) {
        isMeetRequire = meetRequire;
    }

    public boolean getIsCooperate() {
        return isCooperate;
    }

    public void setIsCooperate(boolean cooperate) {
        isCooperate = cooperate;
    }

    public boolean getIsDedicate() {
        return isDedicate;
    }

    public void setIsDedicate(boolean dedicate) {
        isDedicate = dedicate;
    }

    public String getAcceptIntend1() {
        return acceptIntend1;
    }

    public void setAcceptIntend1(String acceptIntend1) {
        this.acceptIntend1 = acceptIntend1;
    }

    public String getWasteName1() {
        return wasteName1;
    }

    public void setWasteName1(String wasteName1) {
        this.wasteName1 = wasteName1;
    }

    public String getWasteName2() {
        return wasteName2;
    }

    public void setWasteName2(String wasteName2) {
        this.wasteName2 = wasteName2;
    }

    public String getWasteName3() {
        return wasteName3;
    }

    public void setWasteName3(String wasteName3) {
        this.wasteName3 = wasteName3;
    }

    public String getWasteName4() {
        return wasteName4;
    }

    public void setWasteName4(String wasteName4) {
        this.wasteName4 = wasteName4;
    }

    public String getWasteName5() {
        return wasteName5;
    }

    public void setWasteName5(String wasteName5) {
        this.wasteName5 = wasteName5;
    }

    public String getWasteName6() {
        return wasteName6;
    }

    public void setWasteName6(String wasteName6) {
        this.wasteName6 = wasteName6;
    }

    public String getOtherRisk() {
        return otherRisk;
    }

    public void setOtherRisk(String otherRisk) {
        this.otherRisk = otherRisk;
    }

    public String getAcceptIntend2() {
        return acceptIntend2;
    }

    public void setAcceptIntend2(String acceptIntend2) {
        this.acceptIntend2 = acceptIntend2;
    }

    public String getUnacceptReason2() {
        return unacceptReason2;
    }

    public void setUnacceptReason2(String unacceptReason2) {
        this.unacceptReason2 = unacceptReason2;
    }

    public String getConditionReason2() {
        return conditionReason2;
    }

    public void setConditionReason2(String conditionReason2) {
        this.conditionReason2 = conditionReason2;
    }

    public boolean getIsStore() {
        return isStore;
    }

    public void setIsStore(boolean store) {
        isStore = store;
    }

    public String getStoreReason() {
        return storeReason;
    }

    public void setStoreReason(String storeReason) {
        this.storeReason = storeReason;
    }

    public boolean getIsProcess() {
        return isProcess;
    }

    public void setIsProcess(boolean process) {
        isProcess = process;
    }

    public String getProcessReason() {
        return processReason;
    }

    public void setProcessReason(String processReason) {
        this.processReason = processReason;
    }

    public String getAcceptIntend3() {
        return acceptIntend3;
    }

    public void setAcceptIntend3(String acceptIntend3) {
        this.acceptIntend3 = acceptIntend3;
    }

    public String getUnacceptReason3() {
        return unacceptReason3;
    }

    public void setUnacceptReason3(String unacceptReason3) {
        this.unacceptReason3 = unacceptReason3;
    }

    public String getConditionReason3() {
        return conditionReason3;
    }

    public void setConditionReason3(String conditionReason3) {
        this.conditionReason3 = conditionReason3;
    }

    public boolean getIsExamined() {
        return isExamined;
    }

    public void setIsExamined(boolean examined) {
        isExamined = examined;
    }

}
