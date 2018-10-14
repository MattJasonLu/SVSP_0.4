package com.jdlink.domain.Produce;

import com.jdlink.domain.Client;
import com.jdlink.domain.PackageType;
import com.jdlink.domain.Page;

/**
 * 危废入场报告
 */
public class WasteInto {
    /**
     * 化验单对象（代入数据）
     */
    private LaboratoryTest laboratoryTest;
    /**
     * 进料方式
     */
    private HandleCategory handleCategory;
    /**
     * 处理方式
     */
    private ProcessWay processWay;
    /**
     * 包装方式
     */
    private PackageType packageType;
    /**
     * 备注
     */
    private String remarks;

    /**
     * 转移联单号
     * @return
     */
    private String transferDraftId;

    /**
     * 产废单位
     * @return
     */
    private Client client;

    /**
     * 废物类别
     * @return
     */
    private String wastesCategory;

    /**
     * 分页
     * @return
     */
    private Page page;

    //用于导出
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getWastesCategory() {
        return wastesCategory;
    }

    public void setWastesCategory(String wastesCategory) {
        this.wastesCategory = wastesCategory;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getTransferDraftId() {
        return transferDraftId;
    }

    public void setTransferDraftId(String transferDraftId) {
        this.transferDraftId = transferDraftId;
    }

    public LaboratoryTest getLaboratoryTest() {
        return laboratoryTest;
    }

    public void setLaboratoryTest(LaboratoryTest laboratoryTest) {
        this.laboratoryTest = laboratoryTest;
    }

    public HandleCategory getHandleCategory() {
        return handleCategory;
    }

    public void setHandleCategory(HandleCategory handleCategory) {
        this.handleCategory = handleCategory;
    }

    public ProcessWay getProcessWay() {
        return processWay;
    }

    public void setProcessWay(ProcessWay processWay) {
        this.processWay = processWay;
    }

    public PackageType getPackageType() {
        return packageType;
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    @Override
    public String toString() {
        return "WasteInto{" +
                "laboratoryTest=" + laboratoryTest +
                ", handleCategory=" + handleCategory +
                ", processWay=" + processWay +
                ", packageType=" + packageType +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
