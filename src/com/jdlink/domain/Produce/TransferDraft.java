package com.jdlink.domain.Produce;

import com.jdlink.domain.*;
import com.jdlink.domain.Dictionary.CheckStateItem;

import java.util.Date;

/**
 * Created by matt on 2018/8/1.
 * 转运联单
 */
public class TransferDraft {
    /**
     * 联单编号
     */
    private String id;
    /**
     * 状态
     */
    private CheckState checkState;
    /**
     * 审批状态数据字典
     */
    private CheckStateItem checkStateItem;
    // 生产单位填写信息
    /**
     * 产生单位
     */
    private Client produceCompany;
    /**
     * 运输单位
     */
    private Supplier transportCompany;
    /**
     * 接收单位
     */
    private Client acceptCompany;
    /**
     * 危废
     */
    private Wastes wastes;
    /**
     * 1库数量
     */
    private Float count1H;
    /**
     * 2库数量
     */
    private Float count2H;
    /**
     * 智能库数量
     */
    private Float countZN;
    /**
     * 入库时分
     */
    private String inboundTime;
    /**
     * 出库时分
     */
    private String outboundTime;
    /**
     * 联单编号
     */
    private String transferId;
    /**
     * 外运目的-是否中转储存
     */
    private boolean outwardIsTransit;
    /**
     * 外运目的-是否利用
     */
    private boolean outwardIsUse;
    /**
     * 外运目的-是否处理
     */
    private boolean outwardIsDeal;
    /**
     * 外运目的-是否处置
     */
    private boolean outwardIsDispose;
    /**
     * 主要危险成分
     */
    private String mainDangerComponent;
    /**
     * 危险特性与禁忌
     */
    private String dangerCharacter;
    /**
     * 应急措施
     */
    private String emergencyMeasure;
    /**
     * 应急设备
     */
    private String emergencyEquipment;
    /**
     * 发运人
     */
    private String dispatcher;
    /**
     * 运达地
     */
    private String destination;
    /**
     * 转移时间
     */
    private Date transferTime;

    // 运输单位填写信息
    /**
     * 第一承运人
     */
    private String firstCarrier;
    /**
     * 运输时间1
     */
    private Date firstCarryTime;
    /**
     * 车（船）型1
     */
    private String firstModel;
    /**
     * 牌号1
     */
    private String firstBrand;
    /**
     * 道路运输证号1
     */
    private String firstTransportNumber;
    /**
     * 运输起点1
     */
    private String firstOrigin;
    /**
     * 经由地1
     */
    private String firstStation;
    /**
     * 运输终点1
     */
    private String firstDestination;
    /**
     * 运输人签字1
     */
    private String firstCarrierSign;
    /**
     * 第二承运人
     */
    private String secondCarrier;
    /**
     * 运输时间2
     */
    private Date secondCarryTime;
    /**
     * 车（船）型2
     */
    private String secondModel;
    /**
     * 牌号2
     */
    private String secondBrand;
    /**
     * 道路运输证号2
     */
    private String secondTransportNumber;
    /**
     * 运输起点2
     */
    private String secondOrigin;
    /**
     * 经由地2
     */
    private String secondStation;
    /**
     * 运输终点2
     */
    private String secondDestination;
    /**
     * 运输人签字2
     */
    private String secondCarrierSign;

    // 接收单位填写信息
    /**
     * 经营许可证号
     */
    private String acceptCompanyLicense;
    /**
     * 接收人
     */
    private String recipient;
    /**
     * 接收日期
     */
    private Date acceptDate;
    /**
     * 废物处置方式-是否利用
     */
    private boolean disposeIsUse;
    /**
     * 废物处置方式-是否贮存
     */
    private boolean disposeIsStore;
    /**
     * 废物处置方式-是否焚烧
     */
    private boolean disposeIsBurn;
    /**
     * 废物处置方式-是否填埋
     */
    private boolean disposeIsLandFill;
    /**
     * 废物处置方式-是否其他
     */
    private boolean disposeIsOther;
    /**
     * 单位负责人签字
     */
    private String headSign;
    /**
     * 填写日期
     */
    private Date signDate;
    /**
     * 备注
     */
    private String remark;
    /**
     * 记录最后操作时间，用于排序
     */
    private Date nowTime;
    /**
     * 关键字，用于查询
     */
    private String keyword;
    /**
     * 页码，用于翻页
     */
    private Page page;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
    }

    public Client getProduceCompany() {
        return produceCompany;
    }

    public void setProduceCompany(Client produceCompany) {
        this.produceCompany = produceCompany;
    }

    public Supplier getTransportCompany() {
        return transportCompany;
    }

    public void setTransportCompany(Supplier transportCompany) {
        this.transportCompany = transportCompany;
    }

    public Client getAcceptCompany() {
        return acceptCompany;
    }

    public void setAcceptCompany(Client acceptCompany) {
        this.acceptCompany = acceptCompany;
    }

    public Wastes getWastes() {
        return wastes;
    }

    public void setWastes(Wastes wastes) {
        this.wastes = wastes;
    }

    public Float getCount1H() {
        return count1H;
    }

    public void setCount1H(Float count1H) {
        this.count1H = count1H;
    }

    public Float getCount2H() {
        return count2H;
    }

    public void setCount2H(Float count2H) {
        this.count2H = count2H;
    }

    public Float getCountZN() {
        return countZN;
    }

    public void setCountZN(Float countZN) {
        this.countZN = countZN;
    }

    public String getInboundTime() {
        return inboundTime;
    }

    public void setInboundTime(String inboundTime) {
        this.inboundTime = inboundTime;
    }

    public String getOutboundTime() {
        return outboundTime;
    }

    public void setOutboundTime(String outboundTime) {
        this.outboundTime = outboundTime;
    }

    public String getTransferId() {
        return transferId;
    }

    public void setTransferId(String transferId) {
        this.transferId = transferId;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public boolean isOutwardIsTransit() {
        return outwardIsTransit;
    }

    public void setOutwardIsTransit(boolean outwardIsTransit) {
        this.outwardIsTransit = outwardIsTransit;
    }

    public boolean isOutwardIsUse() {
        return outwardIsUse;
    }

    public void setOutwardIsUse(boolean outwardIsUse) {
        this.outwardIsUse = outwardIsUse;
    }

    public boolean isOutwardIsDeal() {
        return outwardIsDeal;
    }

    public void setOutwardIsDeal(boolean outwardIsDeal) {
        this.outwardIsDeal = outwardIsDeal;
    }

    public boolean isOutwardIsDispose() {
        return outwardIsDispose;
    }

    public void setOutwardIsDispose(boolean outwardIsDispose) {
        this.outwardIsDispose = outwardIsDispose;
    }

    public String getMainDangerComponent() {
        return mainDangerComponent;
    }

    public void setMainDangerComponent(String mainDangerComponent) {
        this.mainDangerComponent = mainDangerComponent;
    }

    public String getDangerCharacter() {
        return dangerCharacter;
    }

    public void setDangerCharacter(String dangerCharacter) {
        this.dangerCharacter = dangerCharacter;
    }

    public String getEmergencyMeasure() {
        return emergencyMeasure;
    }

    public void setEmergencyMeasure(String emergencyMeasure) {
        this.emergencyMeasure = emergencyMeasure;
    }

    public String getEmergencyEquipment() {
        return emergencyEquipment;
    }

    public void setEmergencyEquipment(String emergencyEquipment) {
        this.emergencyEquipment = emergencyEquipment;
    }

    public String getDispatcher() {
        return dispatcher;
    }

    public void setDispatcher(String dispatcher) {
        this.dispatcher = dispatcher;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Date getTransferTime() {
        return transferTime;
    }

    public void setTransferTime(Date transferTime) {
        this.transferTime = transferTime;
    }

    public String getFirstCarrier() {
        return firstCarrier;
    }

    public void setFirstCarrier(String firstCarrier) {
        this.firstCarrier = firstCarrier;
    }

    public Date getFirstCarryTime() {
        return firstCarryTime;
    }

    public void setFirstCarryTime(Date firstCarryTime) {
        this.firstCarryTime = firstCarryTime;
    }

    public String getFirstModel() {
        return firstModel;
    }

    public void setFirstModel(String firstModel) {
        this.firstModel = firstModel;
    }

    public String getFirstTransportNumber() {
        return firstTransportNumber;
    }

    public void setFirstTransportNumber(String firstTransportNumber) {
        this.firstTransportNumber = firstTransportNumber;
    }

    public String getFirstOrigin() {
        return firstOrigin;
    }

    public void setFirstOrigin(String firstOrigin) {
        this.firstOrigin = firstOrigin;
    }

    public String getFirstStation() {
        return firstStation;
    }

    public void setFirstStation(String firstStation) {
        this.firstStation = firstStation;
    }

    public String getFirstDestination() {
        return firstDestination;
    }

    public void setFirstDestination(String firstDestination) {
        this.firstDestination = firstDestination;
    }

    public String getFirstCarrierSign() {
        return firstCarrierSign;
    }

    public void setFirstCarrierSign(String firstCarrierSign) {
        this.firstCarrierSign = firstCarrierSign;
    }

    public String getSecondCarrier() {
        return secondCarrier;
    }

    public void setSecondCarrier(String secondCarrier) {
        this.secondCarrier = secondCarrier;
    }

    public Date getSecondCarryTime() {
        return secondCarryTime;
    }

    public void setSecondCarryTime(Date secondCarryTime) {
        this.secondCarryTime = secondCarryTime;
    }

    public String getSecondModel() {
        return secondModel;
    }

    public void setSecondModel(String secondModel) {
        this.secondModel = secondModel;
    }

    public String getSecondTransportNumber() {
        return secondTransportNumber;
    }

    public void setSecondTransportNumber(String secondTransportNumber) {
        this.secondTransportNumber = secondTransportNumber;
    }

    public String getSecondOrigin() {
        return secondOrigin;
    }

    public void setSecondOrigin(String secondOrigin) {
        this.secondOrigin = secondOrigin;
    }

    public String getSecondStation() {
        return secondStation;
    }

    public void setSecondStation(String secondStation) {
        this.secondStation = secondStation;
    }

    public String getSecondDestination() {
        return secondDestination;
    }

    public void setSecondDestination(String secondDestination) {
        this.secondDestination = secondDestination;
    }

    public String getSecondCarrierSign() {
        return secondCarrierSign;
    }

    public void setSecondCarrierSign(String secondCarrierSign) {
        this.secondCarrierSign = secondCarrierSign;
    }

    public String getAcceptCompanyLicense() {
        return acceptCompanyLicense;
    }

    public void setAcceptCompanyLicense(String acceptCompanyLicense) {
        this.acceptCompanyLicense = acceptCompanyLicense;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public Date getAcceptDate() {
        return acceptDate;
    }

    public void setAcceptDate(Date acceptDate) {
        this.acceptDate = acceptDate;
    }

    public boolean isDisposeIsUse() {
        return disposeIsUse;
    }

    public void setDisposeIsUse(boolean disposeIsUse) {
        this.disposeIsUse = disposeIsUse;
    }

    public boolean isDisposeIsStore() {
        return disposeIsStore;
    }

    public void setDisposeIsStore(boolean disposeIsStore) {
        this.disposeIsStore = disposeIsStore;
    }

    public boolean isDisposeIsBurn() {
        return disposeIsBurn;
    }

    public void setDisposeIsBurn(boolean disposeIsBurn) {
        this.disposeIsBurn = disposeIsBurn;
    }

    public boolean isDisposeIsLandFill() {
        return disposeIsLandFill;
    }

    public void setDisposeIsLandFill(boolean disposeIsLandFill) {
        this.disposeIsLandFill = disposeIsLandFill;
    }

    public boolean isDisposeIsOther() {
        return disposeIsOther;
    }

    public void setDisposeIsOther(boolean disposeIsOther) {
        this.disposeIsOther = disposeIsOther;
    }

    public String getHeadSign() {
        return headSign;
    }

    public void setHeadSign(String headSign) {
        this.headSign = headSign;
    }

    public Date getSignDate() {
        return signDate;
    }

    public void setSignDate(Date signDate) {
        this.signDate = signDate;
    }

    public Date getNowTime() {
        return nowTime;
    }

    public void setNowTime(Date nowTime) {
        this.nowTime = nowTime;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Page getPage() {
        return page;
    }

    public void setPage(Page page) {
        this.page = page;
    }

    public String getFirstBrand() {
        return firstBrand;
    }

    public void setFirstBrand(String firstBrand) {
        this.firstBrand = firstBrand;
    }

    public String getSecondBrand() {
        return secondBrand;
    }

    public void setSecondBrand(String secondBrand) {
        this.secondBrand = secondBrand;
    }

    public CheckStateItem getCheckStateItem() {
        return checkStateItem;
    }

    public void setCheckStateItem(CheckStateItem checkStateItem) {
        this.checkStateItem = checkStateItem;
    }

    @Override
    public String toString() {
        return "TransferDraft{" +
                "id='" + id + '\'' +
                ", produceCompany=" + produceCompany +
                ", transportCompany=" + transportCompany +
                ", acceptCompany=" + acceptCompany +
                ", wastes=" + wastes +
                ", outwardIsTransit=" + outwardIsTransit +
                ", outwardIsUse=" + outwardIsUse +
                ", outwardIsDeal=" + outwardIsDeal +
                ", outwardIsDispose=" + outwardIsDispose +
                ", mainDangerComponent='" + mainDangerComponent + '\'' +
                ", dangerCharacter='" + dangerCharacter + '\'' +
                ", emergencyMeasure='" + emergencyMeasure + '\'' +
                ", emergencyEquipment='" + emergencyEquipment + '\'' +
                ", dispatcher='" + dispatcher + '\'' +
                ", destination='" + destination + '\'' +
                ", transferTime=" + transferTime +
                ", firstCarrier='" + firstCarrier + '\'' +
                ", firstCarryTime=" + firstCarryTime +
                ", firstModel='" + firstModel + '\'' +
                ", firstTransportNumber='" + firstTransportNumber + '\'' +
                ", firstOrigin='" + firstOrigin + '\'' +
                ", firstStation='" + firstStation + '\'' +
                ", firstDestination='" + firstDestination + '\'' +
                ", firstCarrierSign='" + firstCarrierSign + '\'' +
                ", secondCarrier='" + secondCarrier + '\'' +
                ", secondCarryTime=" + secondCarryTime +
                ", secondModel='" + secondModel + '\'' +
                ", secondTransportNumber='" + secondTransportNumber + '\'' +
                ", secondOrigin='" + secondOrigin + '\'' +
                ", secondStation='" + secondStation + '\'' +
                ", secondDestination='" + secondDestination + '\'' +
                ", secondCarrierSign='" + secondCarrierSign + '\'' +
                ", acceptCompanyLicense='" + acceptCompanyLicense + '\'' +
                ", recipient='" + recipient + '\'' +
                ", acceptDate=" + acceptDate +
                ", disposeIsUse=" + disposeIsUse +
                ", disposeIsStore=" + disposeIsStore +
                ", disposeIsBurn=" + disposeIsBurn +
                ", disposeIsLandFill=" + disposeIsLandFill +
                ", disposeIsOther=" + disposeIsOther +
                ", headSign='" + headSign + '\'' +
                ", signDate=" + signDate +
                '}';
    }
}
