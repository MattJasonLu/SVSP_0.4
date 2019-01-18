package com.jdlink.domain.Inventory;

import com.jdlink.domain.Client;
import com.jdlink.domain.Dictionary.CheckStateItem;
import com.jdlink.domain.Page;
import com.jdlink.domain.Supplier;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

/*应急物料*/
public class EmergencyMaterial {

    /*计划单号*/
   private String planId;

   /*应急单位*/
    private Client client;

    /*物料名称*/
    private String wastesName;

    /*附件路径*/
    private String FileUrl;

    /*合同附加*/
    private MultipartFile multipartFile;

    /*应急联单编号*/
    private String emergencyNumber;

    /*处置单位*/
    private Supplier supplier;

    /*8位代码*/
    private String wastesCode;

    /*创建时间*/
    private Date createTime;

    /*状态数据字典*/
   private CheckStateItem checkStateItem;

   /*分页*/
    private Page page;

    /*关键字*/
    private String keyword;

    /*暂存数量*/
    private float temporaryCount;

    public float getTemporaryCount() {
        return temporaryCount;
    }

    public void setTemporaryCount(float temporaryCount) {
        this.temporaryCount = temporaryCount;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    public String getFileUrl() {
        return FileUrl;
    }

    public void setFileUrl(String fileUrl) {
        FileUrl = fileUrl;
    }

    public String getPlanId() {
        return planId;
    }

    public void setPlanId(String planId) {
        this.planId = planId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }



    public MultipartFile getMultipartFile() {
        return multipartFile;
    }

    public void setMultipartFile(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;
    }

    public String getEmergencyNumber() {
        return emergencyNumber;
    }

    public void setEmergencyNumber(String emergencyNumber) {
        this.emergencyNumber = emergencyNumber;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "EmergencyMaterial{" +
                "planId='" + planId + '\'' +
                ", client=" + client +
                ", wastesName='" + wastesName + '\'' +
                ", FileUrl='" + FileUrl + '\'' +
                ", multipartFile=" + multipartFile +
                ", emergencyNumber='" + emergencyNumber + '\'' +
                ", supplier=" + supplier +
                ", wastesCode='" + wastesCode + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}
