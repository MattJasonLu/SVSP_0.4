package com.jdlink.domain;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by matt on 2018/5/14.
 */
public class QuestionnaireAdmin {

    private String questionnaireId;

    private String companyName;

    private String industry;

    private String product;

    private ApplyState state;

    private String author;

    private String contactName;

    private Date time;

    public String getQuestionnaireId() {
        return questionnaireId;
    }

    public void setQuestionnaireId(String questionnaireId) {
        this.questionnaireId = questionnaireId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public ApplyState getState() {
        return state;
    }

    public void setState(ApplyState state) {
        this.state = state;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getTimeStr() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String timeStr;
        try {
            timeStr = simpleDateFormat.format(time);
            return timeStr;
        } catch (Exception e) {
            return "时间错误";
        }

    }
}
