package com.jdlink.domain.Produce;

import com.jdlink.domain.CheckState;
import com.jdlink.domain.Client;
import com.jdlink.domain.Page;

import java.util.Date;

/**
 * Created by Leon on 2018/8/1.
 * 化验单类
 */
public class LaboratoryTest {
    /**
     * 化验单号
     */
    private String laboratoryTestNumber;
    /**
     * 查询号
     */
    private String queryNumber;
    /**
     * 客户对象(企业名称、地址、联系人、联系电话、所属行业、主要产品，共六个属性)
     */
    private Client client;
    /**
     * 填报人
     */
    private String record;
    /**
     * 填报日期
     */
    private Date recordDate;
    /**
     * 化验人
     */
    private String laboratory;
    /**
     * 化验公司
     */
    private String laboratoryCompany;
    /**
     * 化验日期
     */
    private Date laboratoryDate;
    /**
     * 危废名称
     */
    private String wastesName;
    /**
     * 危废代码
     */
    private String wastesCode;
    /**
     * 取样日期
     */
    private Date samplingDate;
    /**
     * 取样号
     */
    private String samplingNumber;
    /**
     * 生产线上取样
     */
    private boolean isProductionLine;
    /**
     * 储存区取样
     */
    private boolean isStorageArea;
    /**
     * 是否检测粘度
     */
    private boolean isViscosity;
    /**
     * 粘度最低预估含量(%)
     */
    private float viscosityMinimum;
    /**
     * 粘度平均预估含量(%)
     */
    private float viscosityAverage;
    /**
     * 粘度最高预估含量(%)
     */
    private float viscosityMaximum;
    /**
     * 是否检测密度
     */
    private boolean isDensity;
    /**
     * 密度最低预估含量(%)
     */
    private float densityMinimum;
    /**
     * 密度平均预估含量(%)
     */
    private float densityAverage;
    /**
     * 密度最高预估含量(%)
     */
    private float densityMaximum;
    /**
     * 是否检测酸碱度
     */
    private boolean isPH;
    /**
     * 酸碱度最低预估含量(%)
     */
    private float phMinimum;
    /**
     * 酸碱度平均预估含量(%)
     */
    private float phAverage;
    /**
     * 酸碱度最高预估含量(%)
     */
    private float phMaximum;
    /**
     * 是否检测热值
     */
    private boolean isHeat;
    /**
     * 热值最低预估含量(%)
     */
    private float heatMinimum;
    /**
     * 热值平均预估含量(%)
     */
    private float heatAverage;
    /**
     * 热值最高预估含量(%)
     */
    private float heatMaximum;
    /**
     * 是否检测灰分
     */
    private boolean isAsh;
    /**
     * 灰分最低预估含量(%)
     */
    private float ashMinimum;
    /**
     * 灰分平均预估含量(%)
     */
    private float ashAverage;
    /**
     * 灰分最高预估含量(%)
     */
    private float ashMaximum;
    /**
     * 是否检测闪点
     */
    private boolean isFlashPoint;
    /**
     * 闪点最低预估含量(%)
     */
    private float flashPointMinimum;
    /**
     * 闪点平均预估含量(%)
     */
    private float flashPointAverage;
    /**
     * 闪点最高预估含量(%)
     */
    private float flashPointMaximum;
    /**
     * 是否检测熔点
     */
    private boolean isMeltingPoint;
    /**
     * 熔点最低预估含量(%)
     */
    private float meltingPointMinimum;
    /**
     * 熔点平均预估含量(%)
     */
    private float meltingPointAverage;
    /**
     * 熔点最高预估含量(%)
     */
    private float meltingPointMaximum;
    /**
     * 是否检测沸点
     */
    private boolean isBoilingPoint;
    /**
     * 沸点最低预估含量(%)
     */
    private float boilingPointMinimum;
    /**
     * 沸点平均预估含量(%)
     */
    private float boilingPointAverage;
    /**
     * 沸点最高预估含量(%)
     */
    private float boilingPointMaximum;
    /**
     * 是否检测含水率
     */
    private boolean isWaterContent;
    /**
     * 含水率最低预估含量(%)
     */
    private float waterContentMinimum;
    /**
     * 含水率平均预估含量(%)
     */
    private float waterContentAverage;
    /**
     * 含水率最高预估含量(%)
     */
    private float waterContentMaximum;
    /**
     * 是否检测固体物质含量
     */
    private boolean isSolidSubstanceContent;
    /**
     * 固体物质含量最低预估含量(%)
     */
    private float solidSubstanceContentMinimum;
    /**
     * 固体物质含量平均预估含量(%)
     */
    private float solidSubstanceContentAverage;
    /**
     * 固体物质含量最高预估含量(%)
     */
    private float solidSubstanceContentMaximum;
    /**
     * 是否检测硫含量
     */
    private boolean isSulfurContent;
    /**
     * 硫含量最低预估含量(%)
     */
    private float sulfurContentMinimum;
    /**
     * 硫含量平均预估含量(%)
     */
    private float sulfurContentAverage;
    /**
     * 硫含量最高预估含量(%)
     */
    private float sulfurContentMaximum;
    /**
     * 是否检测氯含量
     */
    private boolean isChlorineContent;
    /**
     * 氯含量最低预估含量(%)
     */
    private float chlorineContentMinimum;
    /**
     * 氯含量平均预估含量(%)
     */
    private float chlorineContentAverage;
    /**
     * 氯含量最高预估含量(%)
     */
    private float chlorineContentMaximum;
    /**
     * 是否检测氟含量
     */
    private boolean isFluorineContent;
    /**
     * 氟含量最低预估含量(%)
     */
    private float fluorineContentMinimum;
    /**
     * 氟含量平均预估含量(%)
     */
    private float fluorineContentAverage;
    /**
     * 氟含量最高预估含量(%)
     */
    private float fluorineContentMaximum;
    /**
     * 是否检测磷含量
     */
    private boolean isPhosphorusContent;
    /**
     * 磷含量最低预估含量(%)
     */
    private float phosphorusContentMinimum;
    /**
     * 磷含量平均预估含量(%)
     */
    private float phosphorusContentAverage;
    /**
     * 磷含量最高预估含量(%)
     */
    private float phosphorusContentMaximum;
    /**
     * 其他参数成分1
     */
    private String otherParameter1;
    /**
     * 参数成分1最低预估含量(%)
     */
    private float parameter1Minimum;
    /**
     * 参数成分1平均预估含量(%)
     */
    private float parameter1Average;
    /**
     * 参数成分1最高预估含量(%)
     */
    private float parameter1Maximum;
    /**
     * 其他参数成分2
     */
    private String otherParameter2;
    /**
     * 参数成分2最低预估含量(%)
     */
    private float parameter2Minimum;
    /**
     * 参数成分2平均预估含量(%)
     */
    private float parameter2Average;
    /**
     * 参数成分2最高预估含量(%)
     */
    private float parameter2Maximum;
    /**
     * 其他参数成分3
     */
    private String otherParameter3;
    /**
     * 参数成分3最低预估含量(%)
     */
    private float parameter3Minimum;
    /**
     * 参数成分3平均预估含量(%)
     */
    private float parameter3Average;
    /**
     * 参数成分3最高预估含量(%)
     */
    private float parameter3Maximum;
    /**
     * 是否检测Hg
     */
    private boolean isHg;
    /**
     * Hg最低预估含量(%)
     */
    private float HgMinimum;
    /**
     * Hg平均预估含量(%)
     */
    private float HgAverage;
    /**
     * Hg最高预估含量(%)
     */
    private float HgMaximum;
    /**
     * 是否检测Na
     */
    private boolean isNa;
    /**
     * Na最低预估含量(%)
     */
    private float NaMinimum;
    /**
     * Na平均预估含量(%)
     */
    private float NaAverage;
    /**
     * Na最高预估含量(%)
     */
    private float NaMaximum;
    /**
     * 是否检测Cu
     */
    private boolean isCu;
    /**
     * Cu最低预估含量(%)
     */
    private float CuMinimum;
    /**
     * Cu平均预估含量(%)
     */
    private float CuAverage;
    /**
     * Cu最高预估含量(%)
     */
    private float CuMaximum;
    /**
     * 是否检测Ti
     */
    private boolean isTi;
    /**
     * Ti最低预估含量(%)
     */
    private float TiMinimum;
    /**
     * Ti平均预估含量(%)
     */
    private float TiAverage;
    /**
     * Ti最高预估含量(%)
     */
    private float TiMaximum;
    /**
     * 是否检测Li
     */
    private boolean isLi;
    /**
     * Li最低预估含量(%)
     */
    private float LiMinimum;
    /**
     * Li平均预估含量(%)
     */
    private float LiAverage;
    /**
     * Li最高预估含量(%)
     */
    private float LiMaximum;
    /**
     * 是否检测Se
     */
    private boolean isSe;
    /**
     * Se最低预估含量(%)
     */
    private float SeMinimum;
    /**
     * Se平均预估含量(%)
     */
    private float SeAverage;
    /**
     * Se最高预估含量(%)
     */
    private float SeMaximum;
    /**
     * 是否检测Sb
     */
    private boolean isSb;
    /**
     * Sb最低预估含量(%)
     */
    private float SbMinimum;
    /**
     * Sb平均预估含量(%)
     */
    private float SbAverage;
    /**
     * Sb最高预估含量(%)
     */
    private float SbMaximum;
    /**
     * 是否检测Ca
     */
    private boolean isCa;
    /**
     * Ca最低预估含量(%)
     */
    private float CaMinimum;
    /**
     * Ca平均预估含量(%)
     */
    private float CaAverage;
    /**
     * Ca最高预估含量(%)
     */
    private float CaMaximum;
    /**
     * 是否检测Fe
     */
    private boolean isFe;
    /**
     * Fe最低预估含量(%)
     */
    private float FeMinimum;
    /**
     * Fe平均预估含量(%)
     */
    private float FeAverage;
    /**
     * Fe最高预估含量(%)
     */
    private float FeMaximum;
    /**
     * 是否检测Pb
     */
    private boolean isPb;
    /**
     * Pb最低预估含量(%)
     */
    private float PbMinimum;
    /**
     * Pb平均预估含量(%)
     */
    private float PbAverage;
    /**
     * Pb最高预估含量(%)
     */
    private float PbMaximum;
    /**
     * 是否检测Cr
     */
    private boolean isCr;
    /**
     * Cr最低预估含量(%)
     */
    private float CrMinimum;
    /**
     * Cr平均预估含量(%)
     */
    private float CrAverage;
    /**
     * Cr最高预估含量(%)
     */
    private float CrMaximum;
    /**
     * 是否检测V
     */
    private boolean isV;
    /**
     * V最低预估含量(%)
     */
    private float VMinimum;
    /**
     * V平均预估含量(%)
     */
    private float VAverage;
    /**
     * V最高预估含量(%)
     */
    private float VMaximum;
    /**
     * 是否检测Te
     */
    private boolean isTe;
    /**
     * Te最低预估含量(%)
     */
    private float TeMinimum;
    /**
     * Te平均预估含量(%)
     */
    private float TeAverage;
    /**
     * Te最高预估含量(%)
     */
    private float TeMaximum;
    /**
     * 是否检测Zn
     */
    private boolean isZn;
    /**
     * Zn最低预估含量(%)
     */
    private float ZnMinimum;
    /**
     * Zn平均预估含量(%)
     */
    private float ZnAverage;
    /**
     * Zn最高预估含量(%)
     */
    private float ZnMaximum;
    /**
     * 是否检测Cd
     */
    private boolean isCd;
    /**
     * Cd最低预估含量(%)
     */
    private float CdMinimum;
    /**
     * Cd平均预估含量(%)
     */
    private float CdAverage;
    /**
     * Cd最高预估含量(%)
     */
    private float CdMaximum;
    /**
     * 是否检测K
     */
    private boolean isK;
    /**
     * K最低预估含量(%)
     */
    private float KMinimum;
    /**
     * K平均预估含量(%)
     */
    private float KAverage;
    /**
     * K最高预估含量(%)
     */
    private float KMaximum;
    /**
     * 是否检测Mn
     */
    private boolean isMn;
    /**
     * Mn最低预估含量(%)
     */
    private float MnMinimum;
    /**
     * Mn平均预估含量(%)
     */
    private float MnAverage;
    /**
     * Mn最高预估含量(%)
     */
    private float MnMaximum;
    /**
     * 是否检测Co
     */
    private boolean isCo;
    /**
     * Co最低预估含量(%)
     */
    private float CoMinimum;
    /**
     * Co平均预估含量(%)
     */
    private float CoAverage;
    /**
     * Co最高预估含量(%)
     */
    private float CoMaximum;
    /**
     * 是否检测Mg
     */
    private boolean isMg;
    /**
     * Mg最低预估含量(%)
     */
    private float MgMinimum;
    /**
     * Mg平均预估含量(%)
     */
    private float MgAverage;
    /**
     * Mg最高预估含量(%)
     */
    private float MgMaximum;
    /**
     * 是否检测Al
     */
    private boolean isAl;
    /**
     * Al最低预估含量(%)
     */
    private float AlMinimum;
    /**
     * Al平均预估含量(%)
     */
    private float AlAverage;
    /**
     * Al最高预估含量(%)
     */
    private float AlMaximum;
    /**
     * 是否检测As
     */
    private boolean isAs;
    /**
     * As最低预估含量(%)
     */
    private float AsMinimum;
    /**
     * As平均预估含量(%)
     */
    private float AsAverage;
    /**
     * As最高预估含量(%)
     */
    private float AsMaximum;
    /**
     * 是否检测Si
     */
    private boolean isSi;
    /**
     * Si最低预估含量(%)
     */
    private float SiMinimum;
    /**
     * Si平均预估含量(%)
     */
    private float SiAverage;
    /**
     * Si最高预估含量(%)
     */
    private float SiMaximum;
    /**
     * 是否检测Tu
     */
    private boolean isTu;
    /**
     * Tu最低预估含量(%)
     */
    private float TuMinimum;
    /**
     * Tu平均预估含量(%)
     */
    private float TuAverage;
    /**
     * Tu最高预估含量(%)
     */
    private float TuMaximum;
    /**
     * 是否检测Ni
     */
    private boolean isNi;
    /**
     * Ni最低预估含量(%)
     */
    private float NiMinimum;
    /**
     * Ni平均预估含量(%)
     */
    private float NiAverage;
    /**
     * Ni最高预估含量(%)
     */
    private float NiMaximum;
    /**
     * 是否检测Sn
     */
    private boolean isSn;
    /**
     * Sn最低预估含量(%)
     */
    private float SnMinimum;
    /**
     * Sn平均预估含量(%)
     */
    private float SnAverage;
    /**
     * Sn最高预估含量(%)
     */
    private float SnMaximum;
    /**
     * 是否检测Tl
     */
    private boolean isTl;
    /**
     * Tl最低预估含量(%)
     */
    private float TlMinimum;
    /**
     * Tl平均预估含量(%)
     */
    private float TlAverage;
    /**
     * Tl最高预估含量(%)
     */
    private float TlMaximum;
    /**
     * 其他金属成分1
     */
    private String otherMetal1;
    /**
     * 金属成分1最低预估含量(%)
     */
    private float metal1Minimum;
    /**
     * 金属成分1平均预估含量(%)
     */
    private float metal1Average;
    /**
     * 金属成分1最高预估含量(%)
     */
    private float metal1Maximum;
    /**
     * 其他金属成分2
     */
    private String otherMetal2;
    /**
     * 金属成分2最低预估含量(%)
     */
    private float metal2Minimum;
    /**
     * 金属成分2平均预估含量(%)
     */
    private float metal2Average;
    /**
     * 金属成分2最高预估含量(%)
     */
    private float metal2Maximum;
    /**
     * 其他金属成分3
     */
    private String otherMetal3;
    /**
     * 金属成分3最低预估含量(%)
     */
    private float metal3Minimum;
    /**
     * 金属成分3平均预估含量(%)
     */
    private float metal3Average;
    /**
     * 金属成分3最高预估含量(%)
     */
    private float metal3Maximum;
    /**
     * 其他金属成分4
     */
    private String otherMetal4;
    /**
     * 金属成分4最低预估含量(%)
     */
    private float metal4Minimum;
    /**
     * 金属成分4平均预估含量(%)
     */
    private float metal4Average;
    /**
     * 金属成分4最高预估含量(%)
     */
    private float metal4Maximum;
    /**
     * 单据状态
     */
    private CheckState checkState;
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

    public String getLaboratoryTestNumber() {
        return laboratoryTestNumber;
    }

    public void setLaboratoryTestNumber(String laboratoryTestNumber) {
        this.laboratoryTestNumber = laboratoryTestNumber;
    }

    public String getQueryNumber() {
        return queryNumber;
    }

    public void setQueryNumber(String queryNumber) {
        this.queryNumber = queryNumber;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record;
    }

    public Date getRecordDate() {
        return recordDate;
    }

    public void setRecordDate(Date recordDate) {
        this.recordDate = recordDate;
    }

    public String getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(String laboratory) {
        this.laboratory = laboratory;
    }

    public String getLaboratoryCompany() {
        return laboratoryCompany;
    }

    public void setLaboratoryCompany(String laboratoryCompany) {
        this.laboratoryCompany = laboratoryCompany;
    }

    public Date getLaboratoryDate() {
        return laboratoryDate;
    }

    public void setLaboratoryDate(Date laboratoryDate) {
        this.laboratoryDate = laboratoryDate;
    }

    public String getWastesName() {
        return wastesName;
    }

    public void setWastesName(String wastesName) {
        this.wastesName = wastesName;
    }

    public String getWastesCode() {
        return wastesCode;
    }

    public void setWastesCode(String wastesCode) {
        this.wastesCode = wastesCode;
    }

    public boolean getIsDensity() {
        return isDensity;
    }

    public void setIsDensity(boolean isDensity) {
        this.isDensity = isDensity;
    }

    public Date getSamplingDate() {
        return samplingDate;
    }

    public void setSamplingDate(Date samplingDate) {
        this.samplingDate = samplingDate;
    }

    public String getSamplingNumber() {
        return samplingNumber;
    }

    public void setSamplingNumber(String samplingNumber) {
        this.samplingNumber = samplingNumber;
    }

    public boolean getIsProductionLine() {
        return isProductionLine;
    }

    public void setIsProductionLine(boolean isProductionLine) {
        this.isProductionLine = isProductionLine;
    }

    public boolean getIsStorageArea() {
        return isStorageArea;
    }

    public void setIsStorageArea(boolean isStorageArea) {
        this.isStorageArea = isStorageArea;
    }

    public boolean getIsViscosity() {
        return isViscosity;
    }

    public void setIsViscosity(boolean isViscosity) {
        this.isViscosity = isViscosity;
    }

    public float getViscosityMinimum() {
        return viscosityMinimum;
    }

    public void setViscosityMinimum(float viscosityMinimum) {
        this.viscosityMinimum = viscosityMinimum;
    }

    public float getViscosityAverage() {
        return viscosityAverage;
    }

    public void setViscosityAverage(float viscosityAverage) {
        this.viscosityAverage = viscosityAverage;
    }

    public float getViscosityMaximum() {
        return viscosityMaximum;
    }

    public void setViscosityMaximum(float viscosityMaximum) {
        this.viscosityMaximum = viscosityMaximum;
    }

    public float getDensityMinimum() {
        return densityMinimum;
    }

    public void setDensityMinimum(float densityMinimum) {
        this.densityMinimum = densityMinimum;
    }

    public float getDensityAverage() {
        return densityAverage;
    }

    public void setDensityAverage(float densityAverage) {
        this.densityAverage = densityAverage;
    }

    public float getDensityMaximum() {
        return densityMaximum;
    }

    public void setDensityMaximum(float densityMaximum) {
        this.densityMaximum = densityMaximum;
    }

    public boolean getIsPH() {
        return isPH;
    }

    public void setIsPH(boolean isPH) {
        this.isPH = isPH;
    }

    public float getPhMinimum() {
        return phMinimum;
    }

    public void setPhMinimum(float phMinimum) {
        this.phMinimum = phMinimum;
    }

    public float getPhAverage() {
        return phAverage;
    }

    public void setPhAverage(float phAverage) {
        this.phAverage = phAverage;
    }

    public float getPhMaximum() {
        return phMaximum;
    }

    public void setPhMaximum(float phMaximum) {
        this.phMaximum = phMaximum;
    }

    public boolean getIsHeat() {
        return isHeat;
    }

    public void setIsHeat(boolean isHeat) {
        this.isHeat = isHeat;
    }

    public float getHeatMinimum() {
        return heatMinimum;
    }

    public void setHeatMinimum(float heatMinimum) {
        this.heatMinimum = heatMinimum;
    }

    public float getHeatAverage() {
        return heatAverage;
    }

    public void setHeatAverage(float heatAverage) {
        this.heatAverage = heatAverage;
    }

    public float getHeatMaximum() {
        return heatMaximum;
    }

    public void setHeatMaximum(float heatMaximum) {
        this.heatMaximum = heatMaximum;
    }

    public boolean getIsAsh() {
        return isAsh;
    }

    public void setIsAsh(boolean isAsh) {
        this.isAsh = isAsh;
    }

    public float getAshMinimum() {
        return ashMinimum;
    }

    public void setAshMinimum(float ashMinimum) {
        this.ashMinimum = ashMinimum;
    }

    public float getAshAverage() {
        return ashAverage;
    }

    public void setAshAverage(float ashAverage) {
        this.ashAverage = ashAverage;
    }

    public float getAshMaximum() {
        return ashMaximum;
    }

    public void setAshMaximum(float ashMaximum) {
        this.ashMaximum = ashMaximum;
    }

    public boolean getIsFlashPoint() {
        return isFlashPoint;
    }

    public void setIsFlashPoint(boolean isFlashPoint) {
        this.isFlashPoint = isFlashPoint;
    }

    public float getFlashPointMinimum() {
        return flashPointMinimum;
    }

    public void setFlashPointMinimum(float flashPointMinimum) {
        this.flashPointMinimum = flashPointMinimum;
    }

    public float getFlashPointAverage() {
        return flashPointAverage;
    }

    public void setFlashPointAverage(float flashPointAverage) {
        this.flashPointAverage = flashPointAverage;
    }

    public float getFlashPointMaximum() {
        return flashPointMaximum;
    }

    public void setFlashPointMaximum(float flashPointMaximum) {
        this.flashPointMaximum = flashPointMaximum;
    }

    public boolean getIsMeltingPoint() {
        return isMeltingPoint;
    }

    public void setIsMeltingPoint(boolean isMeltingPoint) {
        this.isMeltingPoint = isMeltingPoint;
    }

    public float getMeltingPointMinimum() {
        return meltingPointMinimum;
    }

    public void setMeltingPointMinimum(float meltingPointMinimum) {
        this.meltingPointMinimum = meltingPointMinimum;
    }

    public float getMeltingPointAverage() {
        return meltingPointAverage;
    }

    public void setMeltingPointAverage(float meltingPointAverage) {
        this.meltingPointAverage = meltingPointAverage;
    }

    public float getMeltingPointMaximum() {
        return meltingPointMaximum;
    }

    public void setMeltingPointMaximum(float meltingPointMaximum) {
        this.meltingPointMaximum = meltingPointMaximum;
    }

    public boolean getIsBoilingPoint() {
        return isBoilingPoint;
    }

    public void setIsBoilingPoint(boolean isBoilingPoint) {
        this.isBoilingPoint = isBoilingPoint;
    }

    public float getBoilingPointMinimum() {
        return boilingPointMinimum;
    }

    public void setBoilingPointMinimum(float boilingPointMinimum) {
        this.boilingPointMinimum = boilingPointMinimum;
    }

    public float getBoilingPointAverage() {
        return boilingPointAverage;
    }

    public void setBoilingPointAverage(float boilingPointAverage) {
        this.boilingPointAverage = boilingPointAverage;
    }

    public float getBoilingPointMaximum() {
        return boilingPointMaximum;
    }

    public void setBoilingPointMaximum(float boilingPointMaximum) {
        this.boilingPointMaximum = boilingPointMaximum;
    }

    public boolean getIsWaterContent() {
        return isWaterContent;
    }

    public void setIsWaterContent(boolean isWaterContent) {
        this.isWaterContent = isWaterContent;
    }

    public float getWaterContentMinimum() {
        return waterContentMinimum;
    }

    public void setWaterContentMinimum(float waterContentMinimum) {
        this.waterContentMinimum = waterContentMinimum;
    }

    public float getWaterContentAverage() {
        return waterContentAverage;
    }

    public void setWaterContentAverage(float waterContentAverage) {
        this.waterContentAverage = waterContentAverage;
    }

    public float getWaterContentMaximum() {
        return waterContentMaximum;
    }

    public void setWaterContentMaximum(float waterContentMaximum) {
        this.waterContentMaximum = waterContentMaximum;
    }

    public boolean getIsSolidSubstanceContent() {
        return isSolidSubstanceContent;
    }

    public void setIsSolidSubstanceContent(boolean isSolidSubstanceContent) {
        this.isSolidSubstanceContent = isSolidSubstanceContent;
    }

    public float getSolidSubstanceContentMinimum() {
        return solidSubstanceContentMinimum;
    }

    public void setSolidSubstanceContentMinimum(float solidSubstanceContentMinimum) {
        this.solidSubstanceContentMinimum = solidSubstanceContentMinimum;
    }

    public float getSolidSubstanceContentAverage() {
        return solidSubstanceContentAverage;
    }

    public void setSolidSubstanceContentAverage(float solidSubstanceContentAverage) {
        this.solidSubstanceContentAverage = solidSubstanceContentAverage;
    }

    public float getSolidSubstanceContentMaximum() {
        return solidSubstanceContentMaximum;
    }

    public void setSolidSubstanceContentMaximum(float solidSubstanceContentMaximum) {
        this.solidSubstanceContentMaximum = solidSubstanceContentMaximum;
    }

    public boolean getIsSulfurContent() {
        return isSulfurContent;
    }

    public void setIsSulfurContent(boolean isSulfurContent) {
        this.isSulfurContent = isSulfurContent;
    }

    public float getSulfurContentMinimum() {
        return sulfurContentMinimum;
    }

    public void setSulfurContentMinimum(float sulfurContentMinimum) {
        this.sulfurContentMinimum = sulfurContentMinimum;
    }

    public float getSulfurContentAverage() {
        return sulfurContentAverage;
    }

    public void setSulfurContentAverage(float sulfurContentAverage) {
        this.sulfurContentAverage = sulfurContentAverage;
    }

    public float getSulfurContentMaximum() {
        return sulfurContentMaximum;
    }

    public void setSulfurContentMaximum(float sulfurContentMaximum) {
        this.sulfurContentMaximum = sulfurContentMaximum;
    }

    public boolean getIsChlorineContent() {
        return isChlorineContent;
    }

    public void setIsChlorineContent(boolean isChlorineContent) {
        this.isChlorineContent = isChlorineContent;
    }

    public float getChlorineContentMinimum() {
        return chlorineContentMinimum;
    }

    public void setChlorineContentMinimum(float chlorineContentMinimum) {
        this.chlorineContentMinimum = chlorineContentMinimum;
    }

    public float getChlorineContentAverage() {
        return chlorineContentAverage;
    }

    public void setChlorineContentAverage(float chlorineContentAverage) {
        this.chlorineContentAverage = chlorineContentAverage;
    }

    public float getChlorineContentMaximum() {
        return chlorineContentMaximum;
    }

    public void setChlorineContentMaximum(float chlorineContentMaximum) {
        this.chlorineContentMaximum = chlorineContentMaximum;
    }

    public boolean getIsFluorineContent() {
        return isFluorineContent;
    }

    public void setIsFluorineContent(boolean isFluorineContent) {
        this.isFluorineContent = isFluorineContent;
    }

    public float getFluorineContentMinimum() {
        return fluorineContentMinimum;
    }

    public void setFluorineContentMinimum(float fluorineContentMinimum) {
        this.fluorineContentMinimum = fluorineContentMinimum;
    }

    public float getFluorineContentAverage() {
        return fluorineContentAverage;
    }

    public void setFluorineContentAverage(float fluorineContentAverage) {
        this.fluorineContentAverage = fluorineContentAverage;
    }

    public float getFluorineContentMaximum() {
        return fluorineContentMaximum;
    }

    public void setFluorineContentMaximum(float fluorineContentMaximum) {
        this.fluorineContentMaximum = fluorineContentMaximum;
    }

    public boolean getIsPhosphorusContent() {
        return isPhosphorusContent;
    }

    public void setIsPhosphorusContent(boolean isPhosphorusContent) {
        this.isPhosphorusContent = isPhosphorusContent;
    }

    public float getPhosphorusContentMinimum() {
        return phosphorusContentMinimum;
    }

    public void setPhosphorusContentMinimum(float phosphorusContentMinimum) {
        this.phosphorusContentMinimum = phosphorusContentMinimum;
    }

    public float getPhosphorusContentAverage() {
        return phosphorusContentAverage;
    }

    public void setPhosphorusContentAverage(float phosphorusContentAverage) {
        this.phosphorusContentAverage = phosphorusContentAverage;
    }

    public float getPhosphorusContentMaximum() {
        return phosphorusContentMaximum;
    }

    public void setPhosphorusContentMaximum(float phosphorusContentMaximum) {
        this.phosphorusContentMaximum = phosphorusContentMaximum;
    }

    public String getOtherParameter1() {
        return otherParameter1;
    }

    public void setOtherParameter1(String otherParameter1) {
        this.otherParameter1 = otherParameter1;
    }

    public float getParameter1Minimum() {
        return parameter1Minimum;
    }

    public void setParameter1Minimum(float parameter1Minimum) {
        this.parameter1Minimum = parameter1Minimum;
    }

    public float getParameter1Average() {
        return parameter1Average;
    }

    public void setParameter1Average(float parameter1Average) {
        this.parameter1Average = parameter1Average;
    }

    public float getParameter1Maximum() {
        return parameter1Maximum;
    }

    public void setParameter1Maximum(float parameter1Maximum) {
        this.parameter1Maximum = parameter1Maximum;
    }

    public String getOtherParameter2() {
        return otherParameter2;
    }

    public void setOtherParameter2(String otherParameter2) {
        this.otherParameter2 = otherParameter2;
    }

    public float getParameter2Minimum() {
        return parameter2Minimum;
    }

    public void setParameter2Minimum(float parameter2Minimum) {
        this.parameter2Minimum = parameter2Minimum;
    }

    public float getParameter2Average() {
        return parameter2Average;
    }

    public void setParameter2Average(float parameter2Average) {
        this.parameter2Average = parameter2Average;
    }

    public float getParameter2Maximum() {
        return parameter2Maximum;
    }

    public void setParameter2Maximum(float parameter2Maximum) {
        this.parameter2Maximum = parameter2Maximum;
    }

    public String getOtherParameter3() {
        return otherParameter3;
    }

    public void setOtherParameter3(String otherParameter3) {
        this.otherParameter3 = otherParameter3;
    }

    public float getParameter3Minimum() {
        return parameter3Minimum;
    }

    public void setParameter3Minimum(float parameter3Minimum) {
        this.parameter3Minimum = parameter3Minimum;
    }

    public float getParameter3Average() {
        return parameter3Average;
    }

    public void setParameter3Average(float parameter3Average) {
        this.parameter3Average = parameter3Average;
    }

    public float getParameter3Maximum() {
        return parameter3Maximum;
    }

    public void setParameter3Maximum(float parameter3Maximum) {
        this.parameter3Maximum = parameter3Maximum;
    }

    public boolean getIsHg() {
        return isHg;
    }

    public void setIsHg(boolean isHg) {
        this.isHg = isHg;
    }

    public float getHgMinimum() {
        return HgMinimum;
    }

    public void setHgMinimum(float HgMinimum) {
        this.HgMinimum = HgMinimum;
    }

    public float getHgAverage() {
        return HgAverage;
    }

    public void setHgAverage(float HgAverage) {
        this.HgAverage = HgAverage;
    }

    public float getHgMaximum() {
        return HgMaximum;
    }

    public void setHgMaximum(float HgMaximum) {
        this.HgMaximum = HgMaximum;
    }

    public boolean getIsNa() {
        return isNa;
    }

    public void setIsNa(boolean isNa) {
        this.isNa = isNa;
    }

    public float getNaMinimum() {
        return NaMinimum;
    }

    public void setNaMinimum(float NaMinimum) {
        this.NaMinimum = NaMinimum;
    }

    public float getNaAverage() {
        return NaAverage;
    }

    public void setNaAverage(float NaAverage) {
        this.NaAverage = NaAverage;
    }

    public float getNaMaximum() {
        return NaMaximum;
    }

    public void setNaMaximum(float NaMaximum) {
        this.NaMaximum = NaMaximum;
    }

    public boolean getIsCu() {
        return isCu;
    }

    public void setIsCu(boolean isCu) {
        this.isCu = isCu;
    }

    public float getCuMinimum() {
        return CuMinimum;
    }

    public void setCuMinimum(float CuMinimum) {
        this.CuMinimum = CuMinimum;
    }

    public float getCuAverage() {
        return CuAverage;
    }

    public void setCuAverage(float CuAverage) {
        this.CuAverage = CuAverage;
    }

    public float getCuMaximum() {
        return CuMaximum;
    }

    public void setCuMaximum(float CuMaximum) {
        this.CuMaximum = CuMaximum;
    }

    public boolean getIsTi() {
        return isTi;
    }

    public void setIsTi(boolean isTi) {
        this.isTi = isTi;
    }

    public float getTiMinimum() {
        return TiMinimum;
    }

    public void setTiMinimum(float TiMinimum) {
        this.TiMinimum = TiMinimum;
    }

    public float getTiAverage() {
        return TiAverage;
    }

    public void setTiAverage(float TiAverage) {
        this.TiAverage = TiAverage;
    }

    public float getTiMaximum() {
        return TiMaximum;
    }

    public void setTiMaximum(float TiMaximum) {
        this.TiMaximum = TiMaximum;
    }

    public boolean getIsLi() {
        return isLi;
    }

    public void setIsLi(boolean isLi) {
        this.isLi = isLi;
    }

    public float getLiMinimum() {
        return LiMinimum;
    }

    public void setLiMinimum(float LiMinimum) {
        this.LiMinimum = LiMinimum;
    }

    public float getLiAverage() {
        return LiAverage;
    }

    public void setLiAverage(float LiAverage) {
        this.LiAverage = LiAverage;
    }

    public float getLiMaximum() {
        return LiMaximum;
    }

    public void setLiMaximum(float LiMaximum) {
        this.LiMaximum = LiMaximum;
    }

    public boolean getIsSe() {
        return isSe;
    }

    public void setIsSe(boolean isSe) {
        this.isSe = isSe;
    }

    public float getSeMinimum() {
        return SeMinimum;
    }

    public void setSeMinimum(float SeMinimum) {
        this.SeMinimum = SeMinimum;
    }

    public float getSeAverage() {
        return SeAverage;
    }

    public void setSeAverage(float SeAverage) {
        this.SeAverage = SeAverage;
    }

    public float getSeMaximum() {
        return SeMaximum;
    }

    public void setSeMaximum(float SeMaximum) {
        this.SeMaximum = SeMaximum;
    }

    public boolean getIsSb() {
        return isSb;
    }

    public void setIsSb(boolean isSb) {
        this.isSb = isSb;
    }

    public float getSbMinimum() {
        return SbMinimum;
    }

    public void setSbMinimum(float SbMinimum) {
        this.SbMinimum = SbMinimum;
    }

    public float getSbAverage() {
        return SbAverage;
    }

    public void setSbAverage(float SbAverage) {
        this.SbAverage = SbAverage;
    }

    public float getSbMaximum() {
        return SbMaximum;
    }

    public void setSbMaximum(float SbMaximum) {
        this.SbMaximum = SbMaximum;
    }

    public boolean getIsCa() {
        return isCa;
    }

    public void setIsCa(boolean isCa) {
        this.isCa = isCa;
    }

    public float getCaMinimum() {
        return CaMinimum;
    }

    public void setCaMinimum(float CaMinimum) {
        this.CaMinimum = CaMinimum;
    }

    public float getCaAverage() {
        return CaAverage;
    }

    public void setCaAverage(float CaAverage) {
        this.CaAverage = CaAverage;
    }

    public float getCaMaximum() {
        return CaMaximum;
    }

    public void setCaMaximum(float CaMaximum) {
        this.CaMaximum = CaMaximum;
    }

    public boolean getIsFe() {
        return isFe;
    }

    public void setIsFe(boolean isFe) {
        this.isFe = isFe;
    }

    public float getFeMinimum() {
        return FeMinimum;
    }

    public void setFeMinimum(float FeMinimum) {
        this.FeMinimum = FeMinimum;
    }

    public float getFeAverage() {
        return FeAverage;
    }

    public void setFeAverage(float FeAverage) {
        this.FeAverage = FeAverage;
    }

    public float getFeMaximum() {
        return FeMaximum;
    }

    public void setFeMaximum(float FeMaximum) {
        this.FeMaximum = FeMaximum;
    }

    public boolean getIsPb() {
        return isPb;
    }

    public void setIsPb(boolean isPb) {
        this.isPb = isPb;
    }

    public float getPbMinimum() {
        return PbMinimum;
    }

    public void setPbMinimum(float PbMinimum) {
        this.PbMinimum = PbMinimum;
    }

    public float getPbAverage() {
        return PbAverage;
    }

    public void setPbAverage(float PbAverage) {
        this.PbAverage = PbAverage;
    }

    public float getPbMaximum() {
        return PbMaximum;
    }

    public void setPbMaximum(float PbMaximum) {
        this.PbMaximum = PbMaximum;
    }

    public boolean getIsCr() {
        return isCr;
    }

    public void setIsCr(boolean isCr) {
        this.isCr = isCr;
    }

    public float getCrMinimum() {
        return CrMinimum;
    }

    public void setCrMinimum(float CrMinimum) {
        this.CrMinimum = CrMinimum;
    }

    public float getCrAverage() {
        return CrAverage;
    }

    public void setCrAverage(float CrAverage) {
        this.CrAverage = CrAverage;
    }

    public float getCrMaximum() {
        return CrMaximum;
    }

    public void setCrMaximum(float CrMaximum) {
        this.CrMaximum = CrMaximum;
    }

    public boolean getIsV() {
        return isV;
    }

    public void setIsV(boolean isV) {
        this.isV = isV;
    }

    public float getVMinimum() {
        return VMinimum;
    }

    public void setVMinimum(float VMinimum) {
        this.VMinimum = VMinimum;
    }

    public float getVAverage() {
        return VAverage;
    }

    public void setVAverage(float VAverage) {
        this.VAverage = VAverage;
    }

    public float getVMaximum() {
        return VMaximum;
    }

    public void setVMaximum(float VMaximum) {
        this.VMaximum = VMaximum;
    }

    public boolean getIsTe() {
        return isTe;
    }

    public void setIsTe(boolean isTe) {
        this.isTe = isTe;
    }

    public float getTeMinimum() {
        return TeMinimum;
    }

    public void setTeMinimum(float TeMinimum) {
        this.TeMinimum = TeMinimum;
    }

    public float getTeAverage() {
        return TeAverage;
    }

    public void setTeAverage(float TeAverage) {
        this.TeAverage = TeAverage;
    }

    public float getTeMaximum() {
        return TeMaximum;
    }

    public void setTeMaximum(float TeMaximum) {
        this.TeMaximum = TeMaximum;
    }

    public boolean getIsZn() {
        return isZn;
    }

    public void setIsZn(boolean isZn) {
        this.isZn = isZn;
    }

    public float getZnMinimum() {
        return ZnMinimum;
    }

    public void setZnMinimum(float ZnMinimum) {
        this.ZnMinimum = ZnMinimum;
    }

    public float getZnAverage() {
        return ZnAverage;
    }

    public void setZnAverage(float ZnAverage) {
        this.ZnAverage = ZnAverage;
    }

    public float getZnMaximum() {
        return ZnMaximum;
    }

    public void setZnMaximum(float ZnMaximum) {
        this.ZnMaximum = ZnMaximum;
    }

    public boolean getIsCd() {
        return isCd;
    }

    public void setIsCd(boolean isCd) {
        this.isCd = isCd;
    }

    public float getCdMinimum() {
        return CdMinimum;
    }

    public void setCdMinimum(float CdMinimum) {
        this.CdMinimum = CdMinimum;
    }

    public float getCdAverage() {
        return CdAverage;
    }

    public void setCdAverage(float CdAverage) {
        this.CdAverage = CdAverage;
    }

    public float getCdMaximum() {
        return CdMaximum;
    }

    public void setCdMaximum(float CdMaximum) {
        this.CdMaximum = CdMaximum;
    }

    public boolean getIsK() {
        return isK;
    }

    public void setIsK(boolean isK) {
        this.isK = isK;
    }

    public float getKMinimum() {
        return KMinimum;
    }

    public void setKMinimum(float KMinimum) {
        this.KMinimum = KMinimum;
    }

    public float getKAverage() {
        return KAverage;
    }

    public void setKAverage(float KAverage) {
        this.KAverage = KAverage;
    }

    public float getKMaximum() {
        return KMaximum;
    }

    public void setKMaximum(float KMaximum) {
        this.KMaximum = KMaximum;
    }

    public boolean getIsMn() {
        return isMn;
    }

    public void setIsMn(boolean isMn) {
        this.isMn = isMn;
    }

    public float getMnMinimum() {
        return MnMinimum;
    }

    public void setMnMinimum(float MnMinimum) {
        this.MnMinimum = MnMinimum;
    }

    public float getMnAverage() {
        return MnAverage;
    }

    public void setMnAverage(float MnAverage) {
        this.MnAverage = MnAverage;
    }

    public float getMnMaximum() {
        return MnMaximum;
    }

    public void setMnMaximum(float MnMaximum) {
        this.MnMaximum = MnMaximum;
    }

    public boolean getIsCo() {
        return isCo;
    }

    public void setIsCo(boolean isCo) {
        this.isCo = isCo;
    }

    public float getCoMinimum() {
        return CoMinimum;
    }

    public void setCoMinimum(float CoMinimum) {
        this.CoMinimum = CoMinimum;
    }

    public float getCoAverage() {
        return CoAverage;
    }

    public void setCoAverage(float CoAverage) {
        this.CoAverage = CoAverage;
    }

    public float getCoMaximum() {
        return CoMaximum;
    }

    public void setCoMaximum(float CoMaximum) {
        this.CoMaximum = CoMaximum;
    }

    public boolean getIsMg() {
        return isMg;
    }

    public void setIsMg(boolean isMg) {
        this.isMg = isMg;
    }

    public float getMgMinimum() {
        return MgMinimum;
    }

    public void setMgMinimum(float MgMinimum) {
        this.MgMinimum = MgMinimum;
    }

    public float getMgAverage() {
        return MgAverage;
    }

    public void setMgAverage(float MgAverage) {
        this.MgAverage = MgAverage;
    }

    public float getMgMaximum() {
        return MgMaximum;
    }

    public void setMgMaximum(float MgMaximum) {
        this.MgMaximum = MgMaximum;
    }

    public boolean getIsAl() {
        return isAl;
    }

    public void setIsAl(boolean isAl) {
        this.isAl = isAl;
    }

    public float getAlMinimum() {
        return AlMinimum;
    }

    public void setAlMinimum(float AlMinimum) {
        this.AlMinimum = AlMinimum;
    }

    public float getAlAverage() {
        return AlAverage;
    }

    public void setAlAverage(float AlAverage) {
        this.AlAverage = AlAverage;
    }

    public float getAlMaximum() {
        return AlMaximum;
    }

    public void setAlMaximum(float AlMaximum) {
        this.AlMaximum = AlMaximum;
    }

    public boolean getIsAs() {
        return isAs;
    }

    public void setIsAs(boolean isAs) {
        this.isAs = isAs;
    }

    public float getAsMinimum() {
        return AsMinimum;
    }

    public void setAsMinimum(float AsMinimum) {
        this.AsMinimum = AsMinimum;
    }

    public float getAsAverage() {
        return AsAverage;
    }

    public void setAsAverage(float AsAverage) {
        this.AsAverage = AsAverage;
    }

    public float getAsMaximum() {
        return AsMaximum;
    }

    public void setAsMaximum(float AsMaximum) {
        this.AsMaximum = AsMaximum;
    }

    public boolean getIsSi() {
        return isSi;
    }

    public void setIsSi(boolean isSi) {
        this.isSi = isSi;
    }

    public float getSiMinimum() {
        return SiMinimum;
    }

    public void setSiMinimum(float SiMinimum) {
        this.SiMinimum = SiMinimum;
    }

    public float getSiAverage() {
        return SiAverage;
    }

    public void setSiAverage(float SiAverage) {
        this.SiAverage = SiAverage;
    }

    public float getSiMaximum() {
        return SiMaximum;
    }

    public void setSiMaximum(float SiMaximum) {
        this.SiMaximum = SiMaximum;
    }

    public boolean getIsTu() {
        return isTu;
    }

    public void setIsTu(boolean isTu) {
        this.isTu = isTu;
    }

    public float getTuMinimum() {
        return TuMinimum;
    }

    public void setTuMinimum(float TuMinimum) {
        this.TuMinimum = TuMinimum;
    }

    public float getTuAverage() {
        return TuAverage;
    }

    public void setTuAverage(float TuAverage) {
        this.TuAverage = TuAverage;
    }

    public float getTuMaximum() {
        return TuMaximum;
    }

    public void setTuMaximum(float TuMaximum) {
        this.TuMaximum = TuMaximum;
    }

    public boolean getIsNi() {
        return isNi;
    }

    public void setIsNi(boolean isNi) {
        this.isNi = isNi;
    }

    public float getNiMinimum() {
        return NiMinimum;
    }

    public void setNiMinimum(float NiMinimum) {
        this.NiMinimum = NiMinimum;
    }

    public float getNiAverage() {
        return NiAverage;
    }

    public void setNiAverage(float NiAverage) {
        this.NiAverage = NiAverage;
    }

    public float getNiMaximum() {
        return NiMaximum;
    }

    public void setNiMaximum(float NiMaximum) {
        this.NiMaximum = NiMaximum;
    }

    public boolean getIsSn() {
        return isSn;
    }

    public void setIsSn(boolean isSn) {
        this.isSn = isSn;
    }

    public float getSnMinimum() {
        return SnMinimum;
    }

    public void setSnMinimum(float SnMinimum) {
        this.SnMinimum = SnMinimum;
    }

    public float getSnAverage() {
        return SnAverage;
    }

    public void setSnAverage(float SnAverage) {
        this.SnAverage = SnAverage;
    }

    public float getSnMaximum() {
        return SnMaximum;
    }

    public void setSnMaximum(float SnMaximum) {
        this.SnMaximum = SnMaximum;
    }

    public boolean getIsTl() {
        return isTl;
    }

    public void setIsTl(boolean isTl) {
        this.isTl = isTl;
    }

    public float getTlMinimum() {
        return TlMinimum;
    }

    public void setTlMinimum(float TlMinimum) {
        this.TlMinimum = TlMinimum;
    }

    public float getTlAverage() {
        return TlAverage;
    }

    public void setTlAverage(float TlAverage) {
        this.TlAverage = TlAverage;
    }

    public float getTlMaximum() {
        return TlMaximum;
    }

    public void setTlMaximum(float TlMaximum) {
        this.TlMaximum = TlMaximum;
    }

    public String getOtherMetal1() {
        return otherMetal1;
    }

    public void setOtherMetal1(String otherMetal1) {
        this.otherMetal1 = otherMetal1;
    }

    public float getMetal1Minimum() {
        return metal1Minimum;
    }

    public void setMetal1Minimum(float metal1Minimum) {
        this.metal1Minimum = metal1Minimum;
    }

    public float getMetal1Average() {
        return metal1Average;
    }

    public void setMetal1Average(float metal1Average) {
        this.metal1Average = metal1Average;
    }

    public float getMetal1Maximum() {
        return metal1Maximum;
    }

    public void setMetal1Maximum(float metal1Maximum) {
        this.metal1Maximum = metal1Maximum;
    }

    public String getOtherMetal2() {
        return otherMetal2;
    }

    public void setOtherMetal2(String otherMetal2) {
        this.otherMetal2 = otherMetal2;
    }

    public float getMetal2Minimum() {
        return metal2Minimum;
    }

    public void setMetal2Minimum(float metal2Minimum) {
        this.metal2Minimum = metal2Minimum;
    }

    public float getMetal2Average() {
        return metal2Average;
    }

    public void setMetal2Average(float metal2Average) {
        this.metal2Average = metal2Average;
    }

    public float getMetal2Maximum() {
        return metal2Maximum;
    }

    public void setMetal2Maximum(float metal2Maximum) {
        this.metal2Maximum = metal2Maximum;
    }

    public String getOtherMetal3() {
        return otherMetal3;
    }

    public void setOtherMetal3(String otherMetal3) {
        this.otherMetal3 = otherMetal3;
    }

    public float getMetal3Minimum() {
        return metal3Minimum;
    }

    public void setMetal3Minimum(float metal3Minimum) {
        this.metal3Minimum = metal3Minimum;
    }

    public float getMetal3Average() {
        return metal3Average;
    }

    public void setMetal3Average(float metal3Average) {
        this.metal3Average = metal3Average;
    }

    public float getMetal3Maximum() {
        return metal3Maximum;
    }

    public void setMetal3Maximum(float metal3Maximum) {
        this.metal3Maximum = metal3Maximum;
    }

    public String getOtherMetal4() {
        return otherMetal4;
    }

    public void setOtherMetal4(String otherMetal4) {
        this.otherMetal4 = otherMetal4;
    }

    public float getMetal4Minimum() {
        return metal4Minimum;
    }

    public void setMetal4Minimum(float metal4Minimum) {
        this.metal4Minimum = metal4Minimum;
    }

    public float getMetal4Average() {
        return metal4Average;
    }

    public void setMetal4Average(float metal4Average) {
        this.metal4Average = metal4Average;
    }

    public float getMetal4Maximum() {
        return metal4Maximum;
    }

    public void setMetal4Maximum(float metal4Maximum) {
        this.metal4Maximum = metal4Maximum;
    }

    public CheckState getCheckState() {
        return checkState;
    }

    public void setCheckState(CheckState checkState) {
        this.checkState = checkState;
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

    @Override
    public String toString() {
        return "LaboratoryTest{" +
                "laboratoryTestNumber='" + laboratoryTestNumber + '\'' +
                ", queryNumber='" + queryNumber + '\'' +
                ", client=" + client +
                ", record='" + record + '\'' +
                ", recordDate=" + recordDate +
                ", laboratory='" + laboratory + '\'' +
                ", laboratoryCompany='" + laboratoryCompany + '\'' +
                ", laboratoryDate=" + laboratoryDate +
                ", checkState=" + checkState +
                ", nowTime=" + nowTime +
                ", keyword='" + keyword + '\'' +
                ", page=" + page +
                '}';
    }
}
