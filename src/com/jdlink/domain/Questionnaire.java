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
                '}';
    }
}
