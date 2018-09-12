package com.jdlink.domain.Produce;

import com.jdlink.domain.Inventory.InboundOrderItem;
import com.jdlink.domain.Inventory.OutboundOrder;

import java.util.Date;
import java.util.List;

/**
 * Created by matt on 2018/9/7.
 * DoubleClickTo 666
 */
public class ProductionDaily {
    // 日报信息
    /**
     * 日报编号
     */
    private int id;
    /**
     * 日期
     */
    private Date date;
    // 本日医废信息
    // 医废入库信息
    /**
     * 本日进厂危废
     */
    private float todayInboundMedicalWastes;
    /**
     * 本日直接转外处置量
     */
    private float todayInboundMedicalWastesDirectDisposal;
    /**
     * 本日蒸煮医废
     */
    private float todayInboundMedicalWastesCooking;
    /**
     * 本日误差量
     */
    private float todayInboundMedicalWastesErrorNumber;
    /**
     * 本日蒸煮后重量
     */
    private float todayInboundMedicalWastesAfterCooking;
    /**
     * 本日蒸煮后外送量
     */
    private float todayInboundMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float todayInboundMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float todayInboundMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float todayInboundWastesBulk;
    /**
     * 破碎
     */
    private float todayInboundWastesCrushing;
    /**
     * 污泥
     */
    private float todayInboundWastesSludge;
    /**
     * 精蒸馏
     */
    private float todayInboundWastesDistillation;
    /**
     * 悬挂链
     */
    private float todayInboundWastesSuspension;
    /**
     * 废液
     */
    private float todayInboundWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float todayInboundWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float todayInboundSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float todayInboundSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float todayInboundSecondWastesBucket;

    // 医废出库信息(由处置信息得来)
    /**
     * 本日进厂危废
     */
    private float todayOutboundMedicalWastes;
    /**
     * 本日直接转外处置量
     */
    private float todayOutboundMedicalWastesDirectDisposal;
    /**
     * 本日蒸煮医废
     */
    private float todayOutboundMedicalWastesCooking;
    /**
     * 本日误差量
     */
    private float todayOutboundMedicalWastesErrorNumber;
    /**
     * 本日蒸煮后重量
     */
    private float todayOutboundMedicalWastesAfterCooking;
    /**
     * 本日蒸煮后外送量
     */
    private float todayOutboundMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float todayOutboundMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float todayOutboundMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float todayOutboundWastesBulk;
    /**
     * 破碎
     */
    private float todayOutboundWastesCrushing;
    /**
     * 污泥
     */
    private float todayOutboundWastesSludge;
    /**
     * 精蒸馏
     */
    private float todayOutboundWastesDistillation;
    /**
     * 悬挂链
     */
    private float todayOutboundWastesSuspension;
    /**
     * 废液
     */
    private float todayOutboundWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float todayOutboundWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float todayOutboundSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float todayOutboundSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float todayOutboundSecondWastesBucket;

    // 本月医废信息
    // 医废入库信息
    /**
     * 本月进厂危废
     */
    private float monthInboundMedicalWastes;
    /**
     * 本月直接转外处置量
     */
    private float monthInboundMedicalWastesDirectDisposal;
    /**
     * 本月蒸煮医废
     */
    private float monthInboundMedicalWastesCooking;
    /**
     * 本月误差量
     */
    private float monthInboundMedicalWastesErrorNumber;
    /**
     * 本月蒸煮后重量
     */
    private float monthInboundMedicalWastesAfterCooking;
    /**
     * 本月蒸煮后外送量
     */
    private float monthInboundMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float monthInboundMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float monthInboundMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float monthInboundWastesBulk;
    /**
     * 破碎
     */
    private float monthInboundWastesCrushing;
    /**
     * 污泥
     */
    private float monthInboundWastesSludge;
    /**
     * 精蒸馏
     */
    private float monthInboundWastesDistillation;
    /**
     * 悬挂链
     */
    private float monthInboundWastesSuspension;
    /**
     * 废液
     */
    private float monthInboundWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float monthInboundWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float monthInboundSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float monthInboundSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float monthInboundSecondWastesBucket;

    // 医废出库信息(由处置信息得来)
    /**
     * 本月进厂危废
     */
    private float monthOutboundMedicalWastes;
    /**
     * 本月直接转外处置量
     */
    private float monthOutboundMedicalWastesDirectDisposal;
    /**
     * 本月蒸煮医废
     */
    private float monthOutboundMedicalWastesCooking;
    /**
     * 本月误差量
     */
    private float monthOutboundMedicalWastesErrorNumber;
    /**
     * 本月蒸煮后重量
     */
    private float monthOutboundMedicalWastesAfterCooking;
    /**
     * 本月蒸煮后外送量
     */
    private float monthOutboundMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float monthOutboundMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float monthOutboundMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float monthOutboundWastesBulk;
    /**
     * 破碎
     */
    private float monthOutboundWastesCrushing;
    /**
     * 污泥
     */
    private float monthOutboundWastesSludge;
    /**
     * 精蒸馏
     */
    private float monthOutboundWastesDistillation;
    /**
     * 悬挂链
     */
    private float monthOutboundWastesSuspension;
    /**
     * 废液
     */
    private float monthOutboundWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float monthOutboundWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float monthOutboundSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float monthOutboundSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float monthOutboundSecondWastesBucket;

    // 本年医废信息
    // 医废入库信息
    /**
     * 本月进厂危废
     */
    private float yearInboundMedicalWastes;
    /**
     * 本月直接转外处置量
     */
    private float yearInboundMedicalWastesDirectDisposal;
    /**
     * 本月蒸煮医废
     */
    private float yearInboundMedicalWastesCooking;
    /**
     * 本月误差量
     */
    private float yearInboundMedicalWastesErrorNumber;
    /**
     * 本月蒸煮后重量
     */
    private float yearInboundMedicalWastesAfterCooking;
    /**
     * 本月蒸煮后外送量
     */
    private float yearInboundMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float yearInboundMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float yearInboundMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float yearInboundWastesBulk;
    /**
     * 破碎
     */
    private float yearInboundWastesCrushing;
    /**
     * 污泥
     */
    private float yearInboundWastesSludge;
    /**
     * 精蒸馏
     */
    private float yearInboundWastesDistillation;
    /**
     * 悬挂链
     */
    private float yearInboundWastesSuspension;
    /**
     * 废液
     */
    private float yearInboundWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float yearInboundWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float yearInboundSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float yearInboundSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float yearInboundSecondWastesBucket;

    // 医废出库信息(由处置信息得来)
    /**
     * 进厂危废
     */
    private float yearOutboundMedicalWastes;
    /**
     * 直接转外处置量
     */
    private float yearOutboundMedicalWastesDirectDisposal;
    /**
     * 蒸煮医废
     */
    private float yearOutboundMedicalWastesCooking;
    /**
     * 误差量
     */
    private float yearOutboundMedicalWastesErrorNumber;
    /**
     * 蒸煮后重量
     */
    private float yearOutboundMedicalWastesAfterCooking;
    /**
     * 蒸煮后外送量
     */
    private float yearOutboundMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float yearOutboundMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float yearOutboundMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float yearOutboundWastesBulk;
    /**
     * 破碎
     */
    private float yearOutboundWastesCrushing;
    /**
     * 污泥
     */
    private float yearOutboundWastesSludge;
    /**
     * 精蒸馏
     */
    private float yearOutboundWastesDistillation;
    /**
     * 悬挂链
     */
    private float yearOutboundWastesSuspension;
    /**
     * 废液
     */
    private float yearOutboundWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float yearOutboundWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float yearOutboundSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float yearOutboundSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float yearOutboundSecondWastesBucket;

    // 期初结余
    // 医废入库信息
    /**
     * 本月进厂危废
     */
    private float monthBalanceMedicalWastes;
    /**
     * 本月直接转外处置量
     */
    private float monthBalanceMedicalWastesDirectDisposal;
    /**
     * 本月蒸煮医废
     */
    private float monthBalanceMedicalWastesCooking;
    /**
     * 本月误差量
     */
    private float monthBalanceMedicalWastesErrorNumber;
    /**
     * 本月蒸煮后重量
     */
    private float monthBalanceMedicalWastesAfterCooking;
    /**
     * 本月蒸煮后外送量
     */
    private float monthBalanceMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float monthBalanceMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float monthBalanceMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float monthBalanceWastesBulk;
    /**
     * 破碎
     */
    private float monthBalanceWastesCrushing;
    /**
     * 污泥
     */
    private float monthBalanceWastesSludge;
    /**
     * 精蒸馏
     */
    private float monthBalanceWastesDistillation;
    /**
     * 悬挂链
     */
    private float monthBalanceWastesSuspension;
    /**
     * 废液
     */
    private float monthBalanceWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float monthBalanceWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float monthBalanceSecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float monthBalanceSecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float monthBalanceSecondWastesBucket;

    // 库存含量
    // 医废入库信息
    /**
     * 本月进厂危废
     */
    private float todayInventoryMedicalWastes;
    /**
     * 本月直接转外处置量
     */
    private float todayInventoryMedicalWastesDirectDisposal;
    /**
     * 本月蒸煮医废
     */
    private float todayInventoryMedicalWastesCooking;
    /**
     * 本月误差量
     */
    private float todayInventoryMedicalWastesErrorNumber;
    /**
     * 本月蒸煮后重量
     */
    private float todayInventoryMedicalWastesAfterCooking;
    /**
     * 本月蒸煮后外送量
     */
    private float todayInventoryMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float todayInventoryMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float todayInventoryMedicalWastesWetNumber;
    /**
     * 散料
     */
    private float todayInventoryWastesBulk;
    /**
     * 破碎
     */
    private float todayInventoryWastesCrushing;
    /**
     * 污泥
     */
    private float todayInventoryWastesSludge;
    /**
     * 精蒸馏
     */
    private float todayInventoryWastesDistillation;
    /**
     * 悬挂链
     */
    private float todayInventoryWastesSuspension;
    /**
     * 废液
     */
    private float todayInventoryWastesWasteLiquid;
    /**
     * 工费合计
     */
    private float todayInventoryWastesTotal;
    /**
     * 次生危废 飞灰
     */
    private float todayInventorySecondWastesSlag;
    /**
     * 次生危废 炉渣
     */
    private float todayInventorySecondWastesAsh;
    /**
     * 次生危废 桶
     */
    private float todayInventorySecondWastesBucket;




    // 医废处置信息
    /**
     * 本日进厂危废
     */
    private float todayDisposalMedicalWastes;
    /**
     * 本日直接转外处置量
     */
    private float todayDisposalMedicalWastesDisposalDirect;
    /**
     * 本日蒸煮医废
     */
    private float todayDisposalMedicalWastesCooking;
    /**
     * 本日误差量
     */
    private float todayDisposalMedicalWastesErrorNumber;
    /**
     * 本日蒸煮后重量
     */
    private float todayDisposalMedicalWastesAfterCooking;
    /**
     * 本日蒸煮后外送量
     */
    private float todayDisposalMedicalWastesAfterCookingSend;
    /**
     * 蒸煮后入库量
     */
    private float todayDisposalMedicalWastesAfterCookingInbound;
    /**
     * 水分含量
     */
    private float todayDisposalMedicalWastesWetNumber;

    // 辅料、能源进厂量
    // 本日
    /**
     * 消石灰
     */
    private float todayInboundAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayInboundAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayInboundAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayInboundAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayInboundAuxiliaryLye;
    /**
     * 片碱
     */
    private float todayInboundAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float todayInboundAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float todayInboundAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float todayInboundAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float todayInboundAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float todayInboundAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float todayInboundAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float todayInboundAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float todayInboundAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float todayInboundAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float todayInboundAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float todayInboundAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float todayInboundAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float todayInboundAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float todayInboundAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float todayInboundAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayInboundAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float todayInboundAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float todayInboundAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float todayInboundAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float todayInboundAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float todayInboundAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float todayInboundAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float todayInboundAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float todayInboundAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float todayInboundAuxiliarySteam;
    /**
     * 柴油
     */
    private float todayInboundAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float todayInboundAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float todayInboundAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float todayInboundAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float todayInboundAuxiliaryTapWaterQuantity;

    // 本月
    /**
     * 消石灰
     */
    private float monthInboundAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthInboundAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthInboundAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthInboundAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthInboundAuxiliaryLye;
    /**
     * 片碱
     */
    private float monthInboundAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float monthInboundAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float monthInboundAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float monthInboundAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float monthInboundAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float monthInboundAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float monthInboundAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float monthInboundAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float monthInboundAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float monthInboundAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float monthInboundAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float monthInboundAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float monthInboundAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float monthInboundAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float monthInboundAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float monthInboundAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthInboundAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float monthInboundAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float monthInboundAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float monthInboundAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float monthInboundAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float monthInboundAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float monthInboundAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float monthInboundAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float monthInboundAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float monthInboundAuxiliarySteam;
    /**
     * 柴油
     */
    private float monthInboundAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float monthInboundAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float monthInboundAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float monthInboundAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float monthInboundAuxiliaryTapWaterQuantity;

    // 本年
    /**
     * 消石灰
     */
    private float yearInboundAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float yearInboundAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float yearInboundAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float yearInboundAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float yearInboundAuxiliaryLye;
    /**
     * 片碱
     */
    private float yearInboundAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float yearInboundAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float yearInboundAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float yearInboundAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float yearInboundAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float yearInboundAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float yearInboundAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float yearInboundAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float yearInboundAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float yearInboundAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float yearInboundAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float yearInboundAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float yearInboundAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float yearInboundAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float yearInboundAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float yearInboundAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float yearInboundAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float yearInboundAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float yearInboundAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float yearInboundAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float yearInboundAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float yearInboundAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float yearInboundAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float yearInboundAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float yearInboundAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float yearInboundAuxiliarySteam;
    /**
     * 柴油
     */
    private float yearInboundAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float yearInboundAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float yearInboundAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float yearInboundAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float yearInboundAuxiliaryTapWaterQuantity;

    // 辅料、能源消耗量
    /**
     * 消石灰
     */
    private float todayOutboundAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayOutboundAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayOutboundAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayOutboundAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayOutboundAuxiliaryLye;
    /**
     * 片碱
     */
    private float todayOutboundAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float todayOutboundAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float todayOutboundAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float todayOutboundAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float todayOutboundAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float todayOutboundAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float todayOutboundAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float todayOutboundAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float todayOutboundAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float todayOutboundAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float todayOutboundAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float todayOutboundAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float todayOutboundAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float todayOutboundAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float todayOutboundAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float todayOutboundAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayOutboundAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float todayOutboundAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float todayOutboundAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float todayOutboundAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float todayOutboundAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float todayOutboundAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float todayOutboundAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float todayOutboundAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float todayOutboundAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float todayOutboundAuxiliarySteam;
    /**
     * 柴油
     */
    private float todayOutboundAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float todayOutboundAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float todayOutboundAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float todayOutboundAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float todayOutboundAuxiliaryTapWaterQuantity;

    // 本月
    /**
     * 消石灰
     */
    private float monthOutboundAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthOutboundAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthOutboundAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthOutboundAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthOutboundAuxiliaryLye;
    /**
     * 片碱
     */
    private float monthOutboundAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float monthOutboundAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float monthOutboundAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float monthOutboundAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float monthOutboundAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float monthOutboundAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float monthOutboundAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float monthOutboundAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float monthOutboundAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float monthOutboundAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float monthOutboundAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float monthOutboundAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float monthOutboundAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float monthOutboundAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float monthOutboundAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float monthOutboundAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthOutboundAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float monthOutboundAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float monthOutboundAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float monthOutboundAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float monthOutboundAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float monthOutboundAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float monthOutboundAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float monthOutboundAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float monthOutboundAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float monthOutboundAuxiliarySteam;
    /**
     * 柴油
     */
    private float monthOutboundAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float monthOutboundAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float monthOutboundAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float monthOutboundAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float monthOutboundAuxiliaryTapWaterQuantity;
    // 本年
    /**
     * 消石灰
     */
    private float yearOutboundAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float yearOutboundAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float yearOutboundAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float yearOutboundAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float yearOutboundAuxiliaryLye;
    /**
     * 片碱
     */
    private float yearOutboundAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float yearOutboundAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float yearOutboundAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float yearOutboundAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float yearOutboundAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float yearOutboundAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float yearOutboundAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float yearOutboundAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float yearOutboundAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float yearOutboundAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float yearOutboundAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float yearOutboundAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float yearOutboundAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float yearOutboundAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float yearOutboundAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float yearOutboundAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float yearOutboundAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float yearOutboundAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float yearOutboundAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float yearOutboundAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float yearOutboundAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float yearOutboundAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float yearOutboundAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float yearOutboundAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float yearOutboundAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float yearOutboundAuxiliarySteam;
    /**
     * 柴油
     */
    private float yearOutboundAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float yearOutboundAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float yearOutboundAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float yearOutboundAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float yearOutboundAuxiliaryTapWaterQuantity;
    // 期初结余
    /**
     * 消石灰
     */
    private float monthBalanceAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthBalanceAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthBalanceAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthBalanceAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthBalanceAuxiliaryLye;
    /**
     * 片碱
     */
    private float monthBalanceAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float monthBalanceAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float monthBalanceAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float monthBalanceAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float monthBalanceAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float monthBalanceAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float monthBalanceAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float monthBalanceAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float monthBalanceAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float monthBalanceAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float monthBalanceAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float monthBalanceAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float monthBalanceAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float monthBalanceAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float monthBalanceAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float monthBalanceAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthBalanceAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float monthBalanceAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float monthBalanceAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float monthBalanceAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float monthBalanceAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float monthBalanceAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float monthBalanceAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float monthBalanceAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float monthBalanceAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float monthBalanceAuxiliarySteam;
    /**
     * 柴油
     */
    private float monthBalanceAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float monthBalanceAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float monthBalanceAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float monthBalanceAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float monthBalanceAuxiliaryTapWaterQuantity;
    // 本日库存
    /**
     * 消石灰
     */
    private float todayInventoryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayInventoryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayInventoryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayInventoryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayInventoryAuxiliaryLye;
    /**
     * 片碱
     */
    private float todayInventoryAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float todayInventoryAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float todayInventoryAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float todayInventoryAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float todayInventoryAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float todayInventoryAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float todayInventoryAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float todayInventoryAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float todayInventoryAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float todayInventoryAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float todayInventoryAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float todayInventoryAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float todayInventoryAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float todayInventoryAuxiliaryDeodorant;
    /**
     * 盐
     */
    private float todayInventoryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float todayInventoryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayInventoryAuxiliaryFlyAshBag;
    /**
     * 医废用吨袋
     */
    private float todayInventoryAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float todayInventoryAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float todayInventoryAuxiliaryCollectionBox;
    /**
     * 标准箱
     */
    private float todayInventoryAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float todayInventoryAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float todayInventoryAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float todayInventoryAuxiliaryStandardTray_1_2m;
    /**
     * 吨箱
     */
    private float todayInventoryAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float todayInventoryAuxiliarySteam;
    /**
     * 柴油
     */
    private float todayInventoryAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float todayInventoryAuxiliaryNaturalGas;
    /**
     * 电量
     */
    private float todayInventoryAuxiliaryElectricQuantity;
    /**
     * 工业水量
     */
    private float todayInventoryAuxiliaryIndustrialWater;
    /**
     * 自来水量
     */
    private float todayInventoryAuxiliaryTapWaterQuantity;


    // 消耗量
    // 医废蒸煮
    /**
     * 消毒液
     */
    private float todayDisposalMedicalAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float todayDisposalMedicalAuxiliaryDeodorant;
    /**
     * 医废用吨袋
     */
    private float todayDisposalMedicalAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float todayDisposalMedicalAuxiliaryCollectionBox;
    /**
     * 蒸汽
     */
    private float todayDisposalMedicalAuxiliarySteam;
    /**
     * 工业水量
     */
    private float todayDisposalMedicalAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float todayDisposalMedicalAuxiliaryElectricQuantity;
    // 二期
    /**
     * 消石灰
     */
    private float todayDisposalSecondaryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayDisposalSecondaryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayDisposalSecondaryAuxiliaryLye;
    /**
     * 盐
     */
    private float todayDisposalSecondaryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float todayDisposalSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayDisposalSecondaryAuxiliaryFlyAshBag;
    /**
     * 柴油
     */
    private float todayDisposalSecondaryAuxiliaryDieselOil;
    /**
     * 工业水量
     */
    private float todayDisposalSecondaryAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float todayDisposalSecondaryAuxiliaryElectricQuantity;
    /**
     * 木托盘
     */
    private float todayDisposalSecondaryAuxiliaryWoodenPallets;
    // 三期
    /**
     * 消石灰
     */
    private float todayDisposalThirdAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayDisposalThirdAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayDisposalThirdAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayDisposalThirdAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayDisposalThirdAuxiliaryLye;
    /**
     * 片碱
     */
    private float todayDisposalThirdAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float todayDisposalThirdAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float todayDisposalThirdAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float todayDisposalThirdAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float todayDisposalThirdAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float todayDisposalThirdAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float todayDisposalThirdAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float todayDisposalThirdAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float todayDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float todayDisposalThirdAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float todayDisposalThirdAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float todayDisposalThirdAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float todayDisposalThirdAuxiliaryNaclo;
    /**
     * 标准箱
     */
    private float todayDisposalThirdAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float todayDisposalThirdAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float todayDisposalThirdAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float todayDisposalThirdAuxiliaryStandardTray_1_2m;
    /**
     * 炉渣用吨袋
     */
    private float todayDisposalThirdAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayDisposalThirdAuxiliaryFlyAshBag;
    /**
     * 吨箱
     */
    private float todayDisposalThirdAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float todayDisposalThirdAuxiliarySteam;
    /**
     * 柴油
     */
    private float todayDisposalThirdAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float todayDisposalThirdAuxiliaryNaturalGas;
    /**
     * 工业水量
     */
    private float todayDisposalThirdAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float todayDisposalThirdAuxiliaryElectricQuantity;
    /**
     * 自来水量
     */
    private float todayDisposalThirdAuxiliaryTapWaterQuantity;
    /**
     * 铁塔电量
     */
    private float todayDisposalTowerElectricQuantity;

    // 月累计
    // 医废蒸煮
    /**
     * 消毒液
     */
    private float monthDisposalMedicalAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float monthDisposalMedicalAuxiliaryDeodorant;
    /**
     * 医废用吨袋
     */
    private float monthDisposalMedicalAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float monthDisposalMedicalAuxiliaryCollectionBox;
    /**
     * 蒸汽
     */
    private float monthDisposalMedicalAuxiliarySteam;
    /**
     * 工业水量
     */
    private float monthDisposalMedicalAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float monthDisposalMedicalAuxiliaryElectricQuantity;
    // 二期
    /**
     * 消石灰
     */
    private float monthDisposalSecondaryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthDisposalSecondaryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthDisposalSecondaryAuxiliaryLye;
    /**
     * 盐
     */
    private float monthDisposalSecondaryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float monthDisposalSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthDisposalSecondaryAuxiliaryFlyAshBag;
    /**
     * 柴油
     */
    private float monthDisposalSecondaryAuxiliaryDieselOil;
    /**
     * 工业水量
     */
    private float monthDisposalSecondaryAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float monthDisposalSecondaryAuxiliaryElectricQuantity;
    /**
     * 木托盘
     */
    private float monthDisposalSecondaryAuxiliaryWoodenPallets;
    // 三期
    /**
     * 消石灰
     */
    private float monthDisposalThirdAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthDisposalThirdAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthDisposalThirdAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthDisposalThirdAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthDisposalThirdAuxiliaryLye;
    /**
     * 片碱
     */
    private float monthDisposalThirdAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float monthDisposalThirdAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float monthDisposalThirdAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float monthDisposalThirdAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float monthDisposalThirdAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float monthDisposalThirdAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float monthDisposalThirdAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float monthDisposalThirdAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float monthDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float monthDisposalThirdAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float monthDisposalThirdAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float monthDisposalThirdAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float monthDisposalThirdAuxiliaryNaclo;
    /**
     * 标准箱
     */
    private float monthDisposalThirdAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float monthDisposalThirdAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float monthDisposalThirdAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float monthDisposalThirdAuxiliaryStandardTray_1_2m;
    /**
     * 炉渣用吨袋
     */
    private float monthDisposalThirdAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthDisposalThirdAuxiliaryFlyAshBag;
    /**
     * 吨箱
     */
    private float monthDisposalThirdAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float monthDisposalThirdAuxiliarySteam;
    /**
     * 柴油
     */
    private float monthDisposalThirdAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float monthDisposalThirdAuxiliaryNaturalGas;
    /**
     * 工业水量
     */
    private float monthDisposalThirdAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float monthDisposalThirdAuxiliaryElectricQuantity;
    /**
     * 自来水量
     */
    private float monthDisposalThirdAuxiliaryTapWaterQuantity;
    /**
     * 铁塔电量
     */
    private float monthDisposalTowerElectricQuantity;

    // 年累计
    // 医废蒸煮
    /**
     * 消毒液
     */
    private float yearDisposalMedicalAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float yearDisposalMedicalAuxiliaryDeodorant;
    /**
     * 医废用吨袋
     */
    private float yearDisposalMedicalAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float yearDisposalMedicalAuxiliaryCollectionBox;
    /**
     * 蒸汽
     */
    private float yearDisposalMedicalAuxiliarySteam;
    /**
     * 工业水量
     */
    private float yearDisposalMedicalAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float yearDisposalMedicalAuxiliaryElectricQuantity;
    // 二期
    /**
     * 消石灰
     */
    private float yearDisposalSecondaryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float yearDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float yearDisposalSecondaryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float yearDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float yearDisposalSecondaryAuxiliaryLye;
    /**
     * 盐
     */
    private float yearDisposalSecondaryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float yearDisposalSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float yearDisposalSecondaryAuxiliaryFlyAshBag;
    /**
     * 柴油
     */
    private float yearDisposalSecondaryAuxiliaryDieselOil;
    /**
     * 工业水量
     */
    private float yearDisposalSecondaryAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float yearDisposalSecondaryAuxiliaryElectricQuantity;
    /**
     * 木托盘
     */
    private float yearDisposalSecondaryAuxiliaryWoodenPallets;
    // 三期
    /**
     * 消石灰
     */
    private float yearDisposalThirdAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float yearDisposalThirdAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float yearDisposalThirdAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float yearDisposalThirdAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float yearDisposalThirdAuxiliaryLye;
    /**
     * 片碱
     */
    private float yearDisposalThirdAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float yearDisposalThirdAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float yearDisposalThirdAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float yearDisposalThirdAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float yearDisposalThirdAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float yearDisposalThirdAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float yearDisposalThirdAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float yearDisposalThirdAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float yearDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float yearDisposalThirdAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float yearDisposalThirdAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float yearDisposalThirdAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float yearDisposalThirdAuxiliaryNaclo;
    /**
     * 标准箱
     */
    private float yearDisposalThirdAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float yearDisposalThirdAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float yearDisposalThirdAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float yearDisposalThirdAuxiliaryStandardTray_1_2m;
    /**
     * 炉渣用吨袋
     */
    private float yearDisposalThirdAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float yearDisposalThirdAuxiliaryFlyAshBag;
    /**
     * 吨箱
     */
    private float yearDisposalThirdAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float yearDisposalThirdAuxiliarySteam;
    /**
     * 柴油
     */
    private float yearDisposalThirdAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float yearDisposalThirdAuxiliaryNaturalGas;
    /**
     * 工业水量
     */
    private float yearDisposalThirdAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float yearDisposalThirdAuxiliaryElectricQuantity;
    /**
     * 自来水量
     */
    private float yearDisposalThirdAuxiliaryTapWaterQuantity;
    /**
     * 铁塔电量
     */
    private float yearDisposalTowerElectricQuantity;

    // 日平均
    // 医废蒸煮
    /**
     * 消毒液
     */
    private float todayAverageDisposalMedicalAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float todayAverageDisposalMedicalAuxiliaryDeodorant;
    /**
     * 医废用吨袋
     */
    private float todayAverageDisposalMedicalAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float todayAverageDisposalMedicalAuxiliaryCollectionBox;
    /**
     * 蒸汽
     */
    private float todayAverageDisposalMedicalAuxiliarySteam;
    /**
     * 工业水量
     */
    private float todayAverageDisposalMedicalAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float todayAverageDisposalMedicalAuxiliaryElectricQuantity;
    // 二期
    /**
     * 消石灰
     */
    private float todayAverageDisposalSecondaryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayAverageDisposalSecondaryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayAverageDisposalSecondaryAuxiliaryLye;
    /**
     * 盐
     */
    private float todayAverageDisposalSecondaryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float todayAverageDisposalSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayAverageDisposalSecondaryAuxiliaryFlyAshBag;
    /**
     * 柴油
     */
    private float todayAverageDisposalSecondaryAuxiliaryDieselOil;
    /**
     * 工业水量
     */
    private float todayAverageDisposalSecondaryAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float todayAverageDisposalSecondaryAuxiliaryElectricQuantity;
    /**
     * 木托盘
     */
    private float todayAverageDisposalSecondaryAuxiliaryWoodenPallets;
    // 三期
    /**
     * 消石灰
     */
    private float todayAverageDisposalThirdAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float todayAverageDisposalThirdAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float todayAverageDisposalThirdAuxiliaryLye;
    /**
     * 片碱
     */
    private float todayAverageDisposalThirdAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float todayAverageDisposalThirdAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float todayAverageDisposalThirdAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float todayAverageDisposalThirdAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float todayAverageDisposalThirdAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float todayAverageDisposalThirdAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float todayAverageDisposalThirdAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float todayAverageDisposalThirdAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float todayAverageDisposalThirdAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float todayAverageDisposalThirdAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float todayAverageDisposalThirdAuxiliaryNaclo;
    /**
     * 标准箱
     */
    private float todayAverageDisposalThirdAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float todayAverageDisposalThirdAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float todayAverageDisposalThirdAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float todayAverageDisposalThirdAuxiliaryStandardTray_1_2m;
    /**
     * 炉渣用吨袋
     */
    private float todayAverageDisposalThirdAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float todayAverageDisposalThirdAuxiliaryFlyAshBag;
    /**
     * 吨箱
     */
    private float todayAverageDisposalThirdAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float todayAverageDisposalThirdAuxiliarySteam;
    /**
     * 柴油
     */
    private float todayAverageDisposalThirdAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float todayAverageDisposalThirdAuxiliaryNaturalGas;
    /**
     * 工业水量
     */
    private float todayAverageDisposalThirdAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float todayAverageDisposalThirdAuxiliaryElectricQuantity;
    /**
     * 自来水量
     */
    private float todayAverageDisposalThirdAuxiliaryTapWaterQuantity;
    /**
     * 铁塔电量
     */
    private float todayAverageDisposalTowerElectricQuantity;

    // 月平均
    // 医废蒸煮
    /**
     * 消毒液
     */
    private float monthAverageDisposalMedicalAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float monthAverageDisposalMedicalAuxiliaryDeodorant;
    /**
     * 医废用吨袋
     */
    private float monthAverageDisposalMedicalAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float monthAverageDisposalMedicalAuxiliaryCollectionBox;
    /**
     * 蒸汽
     */
    private float monthAverageDisposalMedicalAuxiliarySteam;
    /**
     * 工业水量
     */
    private float monthAverageDisposalMedicalAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float monthAverageDisposalMedicalAuxiliaryElectricQuantity;
    // 二期
    /**
     * 消石灰
     */
    private float monthAverageDisposalSecondaryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthAverageDisposalSecondaryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthAverageDisposalSecondaryAuxiliaryLye;
    /**
     * 盐
     */
    private float monthAverageDisposalSecondaryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float monthAverageDisposalSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthAverageDisposalSecondaryAuxiliaryFlyAshBag;
    /**
     * 柴油
     */
    private float monthAverageDisposalSecondaryAuxiliaryDieselOil;
    /**
     * 工业水量
     */
    private float monthAverageDisposalSecondaryAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float monthAverageDisposalSecondaryAuxiliaryElectricQuantity;
    /**
     * 木托盘
     */
    private float monthAverageDisposalSecondaryAuxiliaryWoodenPallets;
    // 三期
    /**
     * 消石灰
     */
    private float monthAverageDisposalThirdAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float monthAverageDisposalThirdAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float monthAverageDisposalThirdAuxiliaryLye;
    /**
     * 片碱
     */
    private float monthAverageDisposalThirdAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float monthAverageDisposalThirdAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float monthAverageDisposalThirdAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float monthAverageDisposalThirdAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float monthAverageDisposalThirdAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float monthAverageDisposalThirdAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float monthAverageDisposalThirdAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float monthAverageDisposalThirdAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float monthAverageDisposalThirdAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float monthAverageDisposalThirdAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float monthAverageDisposalThirdAuxiliaryNaclo;
    /**
     * 标准箱
     */
    private float monthAverageDisposalThirdAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float monthAverageDisposalThirdAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float monthAverageDisposalThirdAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float monthAverageDisposalThirdAuxiliaryStandardTray_1_2m;
    /**
     * 炉渣用吨袋
     */
    private float monthAverageDisposalThirdAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float monthAverageDisposalThirdAuxiliaryFlyAshBag;
    /**
     * 吨箱
     */
    private float monthAverageDisposalThirdAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float monthAverageDisposalThirdAuxiliarySteam;
    /**
     * 柴油
     */
    private float monthAverageDisposalThirdAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float monthAverageDisposalThirdAuxiliaryNaturalGas;
    /**
     * 工业水量
     */
    private float monthAverageDisposalThirdAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float monthAverageDisposalThirdAuxiliaryElectricQuantity;
    /**
     * 自来水量
     */
    private float monthAverageDisposalThirdAuxiliaryTapWaterQuantity;
    /**
     * 铁塔电量
     */
    private float monthAverageDisposalTowerElectricQuantity;

    // 限额
    // 医废蒸煮
    /**
     * 消毒液
     */
    private float limitDisposalMedicalAuxiliaryNaclo;
    /**
     * 除臭剂
     */
    private float limitDisposalMedicalAuxiliaryDeodorant;
    /**
     * 医废用吨袋
     */
    private float limitDisposalMedicalAuxiliaryMedicalWastesBag;
    /**
     * 医废包装塑料袋
     */
    private float limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    /**
     * 收集转运箱
     */
    private float limitDisposalMedicalAuxiliaryCollectionBox;
    /**
     * 蒸汽
     */
    private float limitDisposalMedicalAuxiliarySteam;
    /**
     * 工业水量
     */
    private float limitDisposalMedicalAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float limitDisposalMedicalAuxiliaryElectricQuantity;
    // 二期
    /**
     * 消石灰
     */
    private float limitDisposalSecondaryAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float limitDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float limitDisposalSecondaryAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float limitDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float limitDisposalSecondaryAuxiliaryLye;
    /**
     * 盐
     */
    private float limitDisposalSecondaryAuxiliarySalt;
    /**
     * 炉渣用吨袋
     */
    private float limitDisposalSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float limitDisposalSecondaryAuxiliaryFlyAshBag;
    /**
     * 柴油
     */
    private float limitDisposalSecondaryAuxiliaryDieselOil;
    /**
     * 工业水量
     */
    private float limitDisposalSecondaryAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float limitDisposalSecondaryAuxiliaryElectricQuantity;
    /**
     * 木托盘
     */
    private float limitDisposalSecondaryAuxiliaryWoodenPallets;
    // 三期
    /**
     * 消石灰
     */
    private float limitDisposalThirdAuxiliaryCalcareousLime;
    /**
     * 普通活性碳粉
     */
    private float limitDisposalThirdAuxiliaryCommonActivatedCarbon;
    /**
     * 高活性碳粉
     */
    private float limitDisposalThirdAuxiliaryActivatedCarbon;
    /**
     * 活性炭颗粒
     */
    private float limitDisposalThirdAuxiliaryActivatedCarbonParticles;
    /**
     * 碱液
     */
    private float limitDisposalThirdAuxiliaryLye;
    /**
     * 片碱
     */
    private float limitDisposalThirdAuxiliaryCausticSoda;
    /**
     * 尿素
     */
    private float limitDisposalThirdAuxiliaryUrea;
    /**
     * 盐酸
     */
    private float limitDisposalThirdAuxiliaryHydrochloricAcid;
    /**
     * 小苏打(NaHCO3)
     */
    private float limitDisposalThirdAuxiliaryNahco3;
    /**
     * 面粉
     */
    private float limitDisposalThirdAuxiliaryFlour;
    /**
     * 消泡剂
     */
    private float limitDisposalThirdAuxiliaryDefoamer;
    /**
     * 絮凝剂(聚丙烯酰胺)
     */
    private float limitDisposalThirdAuxiliaryFlocculant;
    /**
     * 软水用还原剂
     */
    private float limitDisposalThirdAuxiliarySoftWaterReducingAgent;
    /**
     * 软水用阻垢剂
     */
    private float limitDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    /**
     * 氨水(PH调节剂)
     */
    private float limitDisposalThirdAuxiliaryAmmonia;
    /**
     * 污水用还原剂
     */
    private float limitDisposalThirdAuxiliaryWaterReducingAgent;
    /**
     * 污水用阻垢剂
     */
    private float limitDisposalThirdAuxiliaryWaterScaleInhibitor;
    /**
     * 消毒液
     */
    private float limitDisposalThirdAuxiliaryNaclo;
    /**
     * 标准箱
     */
    private float limitDisposalThirdAuxiliaryStandardBox;
    /**
     * 木托盘
     */
    private float limitDisposalThirdAuxiliaryWoodenPallets;
    /**
     * 1m标准托盘
     */
    private float limitDisposalThirdAuxiliaryStandardTray_1m;
    /**
     * 1.2m标准托盘
     */
    private float limitDisposalThirdAuxiliaryStandardTray_1_2m;
    /**
     * 炉渣用吨袋
     */
    private float limitDisposalThirdSecondaryAuxiliarySlagBag;
    /**
     * 飞灰用吨袋
     */
    private float limitDisposalThirdAuxiliaryFlyAshBag;
    /**
     * 吨箱
     */
    private float limitDisposalThirdAuxiliaryTonBox;
    /**
     * 蒸汽
     */
    private float limitDisposalThirdAuxiliarySteam;
    /**
     * 柴油
     */
    private float limitDisposalThirdAuxiliaryDieselOil;
    /**
     * 天然气
     */
    private float limitDisposalThirdAuxiliaryNaturalGas;
    /**
     * 工业水量
     */
    private float limitDisposalThirdAuxiliaryIndustrialWater;
    /**
     * 电量
     */
    private float limitDisposalThirdAuxiliaryElectricQuantity;
    /**
     * 自来水量
     */
    private float limitDisposalThirdAuxiliaryTapWaterQuantity;
    /**
     * 铁塔电量
     */
    private float limitDisposalTowerElectricQuantity;

    // 工废处置
    /**
     * A2处置的散料
     */
    private float todayOutboundA2WastesBulk;
    /**
     * A2处置的破碎料
     */
    private float todayOutboundA2WastesCrushing;
    /**
     * A2处置的污泥
     */
    private float todayOutboundA2WastesSludge;
    /**
     * A2处置的精馏残渣
     */
    private float todayOutboundA2WastesDistillation;
    /**
     * A2处置的悬挂连
     */
    private float todayOutboundA2WastesSuspension;
    /**
     * A2处置的废液
     */
    private float todayOutboundA2WastesWasteLiquid;
    /**
     * A2处置的医疗废物
     */
    private float todayOutboundA2MedicalWastes;

    /**
     * A2处置的散料
     */
    private float monthOutboundA2WastesBulk;
    /**
     * A2处置的破碎料
     */
    private float monthOutboundA2WastesCrushing;
    /**
     * A2处置的污泥
     */
    private float monthOutboundA2WastesSludge;
    /**
     * A2处置的精馏残渣
     */
    private float monthOutboundA2WastesDistillation;
    /**
     * A2处置的悬挂连
     */
    private float monthOutboundA2WastesSuspension;
    /**
     * A2处置的废液
     */
    private float monthOutboundA2WastesWasteLiquid;
    /**
     * A2处置的医疗废物
     */
    private float monthOutboundA2MedicalWastes;

    /**
     * A2处置的散料
     */
    private float yearOutboundA2WastesBulk;
    /**
     * A2处置的破碎料
     */
    private float yearOutboundA2WastesCrushing;
    /**
     * A2处置的污泥
     */
    private float yearOutboundA2WastesSludge;
    /**
     * A2处置的精馏残渣
     */
    private float yearOutboundA2WastesDistillation;
    /**
     * A2处置的悬挂连
     */
    private float yearOutboundA2WastesSuspension;
    /**
     * A2处置的废液
     */
    private float yearOutboundA2WastesWasteLiquid;
    /**
     * A2处置的医疗废物
     */
    private float yearOutboundA2MedicalWastes;


    /**
     * 备2处置的散料
     */
    private float todayOutboundPrepare2WastesBulk;
    /**
     * 备2处置的破碎料
     */
    private float todayOutboundPrepare2WastesCrushing;
    /**
     * 备2处置的污泥
     */
    private float todayOutboundPrepare2WastesSludge;
    /**
     * 备2处置的精馏残渣
     */
    private float todayOutboundPrepare2WastesDistillation;
    /**
     * 备2处置的悬挂连
     */
    private float todayOutboundPrepare2WastesSuspension;
    /**
     * 备2处置的废液
     */
    private float todayOutboundPrepare2WastesWasteLiquid;
    /**
     * A2处置的医疗废物
     */
    private float todayOutboundPrepare2MedicalWastes;

    /**
     * 备2处置的散料
     */
    private float monthOutboundPrepare2WastesBulk;
    /**
     * 备2处置的破碎料
     */
    private float monthOutboundPrepare2WastesCrushing;
    /**
     * 备2处置的污泥
     */
    private float monthOutboundPrepare2WastesSludge;
    /**
     * 备2处置的精馏残渣
     */
    private float monthOutboundPrepare2WastesDistillation;
    /**
     * 备2处置的悬挂连
     */
    private float monthOutboundPrepare2WastesSuspension;
    /**
     * 备2处置的废液
     */
    private float monthOutboundPrepare2WastesWasteLiquid;
    /**
     * 备2处置的医疗废物
     */
    private float monthOutboundPrepare2MedicalWastes;

    /**
     * 备2处置的散料
     */
    private float yearOutboundPrepare2WastesBulk;
    /**
     * 备2处置的破碎料
     */
    private float yearOutboundPrepare2WastesCrushing;
    /**
     * 备2处置的污泥
     */
    private float yearOutboundPrepare2WastesSludge;
    /**
     * 备2处置的精馏残渣
     */
    private float yearOutboundPrepare2WastesDistillation;
    /**
     * 备2处置的悬挂连
     */
    private float yearOutboundPrepare2WastesSuspension;
    /**
     * 备2处置的废液
     */
    private float yearOutboundPrepare2WastesWasteLiquid;
    /**
     * 备2处置的医疗废物
     */
    private float yearOutboundPrepare2MedicalWastes;

    /**
     * B2处置的散料
     */
    private float todayOutboundB2WastesBulk;
    /**
     * B2处置的破碎料
     */
    private float todayOutboundB2WastesCrushing;
    /**
     * B2处置的污泥
     */
    private float todayOutboundB2WastesSludge;
    /**
     * B2处置的精馏残渣
     */
    private float todayOutboundB2WastesDistillation;
    /**
     * B2处置的悬挂连
     */
    private float todayOutboundB2WastesSuspension;
    /**
     * B2处置的废液
     */
    private float todayOutboundB2WastesWasteLiquid;
    /**
     * B2处置的医废
     */
    private float todayOutboundB2MedicalWastes;

    /**
     * B2处置的散料
     */
    private float monthOutboundB2WastesBulk;
    /**
     * B2处置的破碎料
     */
    private float monthOutboundB2WastesCrushing;
    /**
     * B2处置的污泥
     */
    private float monthOutboundB2WastesSludge;
    /**
     * B2处置的精馏残渣
     */
    private float monthOutboundB2WastesDistillation;
    /**
     * B2处置的悬挂连
     */
    private float monthOutboundB2WastesSuspension;
    /**
     * B2处置的废液
     */
    private float monthOutboundB2WastesWasteLiquid;
    /**
     * B2处置的医废
     */
    private float monthOutboundB2MedicalWastes;
    /**
     * B2处置的散料
     */
    private float yearOutboundB2WastesBulk;
    /**
     * B2处置的破碎料
     */
    private float yearOutboundB2WastesCrushing;
    /**
     * B2处置的污泥
     */
    private float yearOutboundB2WastesSludge;
    /**
     * B2处置的精馏残渣
     */
    private float yearOutboundB2WastesDistillation;
    /**
     * B2处置的悬挂连
     */
    private float yearOutboundB2WastesSuspension;
    /**
     * B2处置的废液
     */
    private float yearOutboundB2WastesWasteLiquid;
    /**
     * B2处置的医废
     */
    private float yearOutboundB2MedicalWastes;

    /**
     * B2处置的散料
     */
    private float todayOutboundB2RateWastesBulk;
    /**
     * B2处置的破碎料
     */
    private float todayOutboundB2RateWastesCrushing;
    /**
     * B2处置的污泥
     */
    private float todayOutboundB2RateWastesSludge;
    /**
     * B2处置的精馏残渣
     */
    private float todayOutboundB2RateWastesDistillation;
    /**
     * B2处置的悬挂连
     */
    private float todayOutboundB2RateWastesSuspension;
    /**
     * B2处置的废液
     */
    private float todayOutboundB2RateWastesWasteLiquid;
    /**
     * B2处置的医废
     */
    private float todayOutboundB2RateMedicalWastes;

    // 二期合计，包括A2、B2和备2
    /**
     * 二期处置的散料
     */
    private float todayOutboundSecondPretreatmentWastesBulk;
    /**
     * 二期处置的破碎料
     */
    private float todayOutboundSecondPretreatmentWastesCrushing;
    /**
     * 二期处置的污泥
     */
    private float todayOutboundSecondPretreatmentWastesSludge;
    /**
     * 二期处置的精馏残渣
     */
    private float todayOutboundSecondPretreatmentWastesDistillation;
    /**
     * 二期处置的悬挂连
     */
    private float todayOutboundSecondPretreatmentWastesSuspension;
    /**
     * 二期处置的废液
     */
    private float todayOutboundSecondPretreatmentWastesWasteLiquid;
    /**
     * 二期处置的医废
     */
    private float todayOutboundSecondPretreatmentMedicalWastes;
    /**
     * 二期处置的散料
     */
    private float monthOutboundSecondPretreatmentWastesBulk;
    /**
     * 二期处置的破碎料
     */
    private float monthOutboundSecondPretreatmentWastesCrushing;
    /**
     * 二期处置的污泥
     */
    private float monthOutboundSecondPretreatmentWastesSludge;
    /**
     * 二期处置的精馏残渣
     */
    private float monthOutboundSecondPretreatmentWastesDistillation;
    /**
     * 二期处置的悬挂连
     */
    private float monthOutboundSecondPretreatmentWastesSuspension;
    /**
     * 二期处置的废液
     */
    private float monthOutboundSecondPretreatmentWastesWasteLiquid;
    /**
     * 二期处置的医废
     */
    private float monthOutboundSecondPretreatmentMedicalWastes;
    /**
     * 二期处置的散料
     */
    private float yearOutboundSecondPretreatmentWastesBulk;
    /**
     * 二期处置的破碎料
     */
    private float yearOutboundSecondPretreatmentWastesCrushing;
    /**
     * 二期处置的污泥
     */
    private float yearOutboundSecondPretreatmentWastesSludge;
    /**
     * 二期处置的精馏残渣
     */
    private float yearOutboundSecondPretreatmentWastesDistillation;
    /**
     * 二期处置的悬挂连
     */
    private float yearOutboundSecondPretreatmentWastesSuspension;
    /**
     * 二期处置的废液
     */
    private float yearOutboundSecondPretreatmentWastesWasteLiquid;
    /**
     * 二期处置的医废
     */
    private float yearOutboundSecondPretreatmentMedicalWastes;

    /**
     * 三期处置的散料
     */
    private float todayOutboundThirdPretreatmentSystemWastesBulk;
    /**
     * 三期处置的破碎料
     */
    private float todayOutboundThirdPretreatmentSystemWastesCrushing;
    /**
     * 三期处置的污泥
     */
    private float todayOutboundThirdPretreatmentSystemWastesSludge;
    /**
     * 三期处置的精馏残渣
     */
    private float todayOutboundThirdPretreatmentSystemWastesDistillation;
    /**
     * 三期处置的悬挂连
     */
    private float todayOutboundThirdPretreatmentSystemWastesSuspension;
    /**
     * 三期处置的废液
     */
    private float todayOutboundThirdPretreatmentSystemWastesWasteLiquid;
    /**
     * 三期处置的医废
     */
    private float todayOutboundThirdPretreatmentSystemMedicalWastes;
    /**
     * 三期处置的散料
     */
    private float monthOutboundThirdPretreatmentSystemWastesBulk;
    /**
     * 三期处置的破碎料
     */
    private float monthOutboundThirdPretreatmentSystemWastesCrushing;
    /**
     * 三期处置的污泥
     */
    private float monthOutboundThirdPretreatmentSystemWastesSludge;
    /**
     * 三期处置的精馏残渣
     */
    private float monthOutboundThirdPretreatmentSystemWastesDistillation;
    /**
     * 三期处置的悬挂连
     */
    private float monthOutboundThirdPretreatmentSystemWastesSuspension;
    /**
     * 三期处置的废液
     */
    private float monthOutboundThirdPretreatmentSystemWastesWasteLiquid;
    /**
     * 三期处置的医废
     */
    private float monthOutboundThirdPretreatmentSystemMedicalWastes;
    /**
     * 三期处置的散料
     */
    private float yearOutboundThirdPretreatmentSystemWastesBulk;
    /**
     * 三期处置的破碎料
     */
    private float yearOutboundThirdPretreatmentSystemWastesCrushing;
    /**
     * 三期处置的污泥
     */
    private float yearOutboundThirdPretreatmentSystemWastesSludge;
    /**
     * 三期处置的精馏残渣
     */
    private float yearOutboundThirdPretreatmentSystemWastesDistillation;
    /**
     * 三期处置的悬挂连
     */
    private float yearOutboundThirdPretreatmentSystemWastesSuspension;
    /**
     * 三期处置的废液
     */
    private float yearOutboundThirdPretreatmentSystemWastesWasteLiquid;
    /**
     * 三期处置的医废
     */
    private float yearOutboundThirdPretreatmentSystemMedicalWastes;
    /**
     * 三期处置的散料占比
     */
    private float todayOutboundThirdPretreatmentSystemRateWastesBulk;
    /**
     * 三期处置的破碎料占比
     */
    private float todayOutboundThirdPretreatmentSystemRateWastesCrushing;
    /**
     * 三期处置的污泥占比
     */
    private float todayOutboundThirdPretreatmentSystemRateWastesSludge;
    /**
     * 三期处置的精馏残渣占比
     */
    private float todayOutboundThirdPretreatmentSystemRateWastesDistillation;
    /**
     * 三期处置的悬挂连占比
     */
    private float todayOutboundThirdPretreatmentSystemRateWastesSuspension;
    /**
     * 三期处置的废液占比
     */
    private float todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    /**
     * 三期处置的医废占比
     */
    private float todayOutboundThirdPretreatmentSystemRateMedicalWastes;
    /**
     * 三期处置的散料占比
     */
    private float monthOutboundThirdPretreatmentSystemRateWastesBulk;
    /**
     * 三期处置的破碎料占比
     */
    private float monthOutboundThirdPretreatmentSystemRateWastesCrushing;
    /**
     * 三期处置的污泥占比
     */
    private float monthOutboundThirdPretreatmentSystemRateWastesSludge;
    /**
     * 三期处置的精馏残渣占比
     */
    private float monthOutboundThirdPretreatmentSystemRateWastesDistillation;
    /**
     * 三期处置的悬挂连占比
     */
    private float monthOutboundThirdPretreatmentSystemRateWastesSuspension;
    /**
     * 三期处置的废液占比
     */
    private float monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    /**
     * 三期处置的医废占比
     */
    private float monthOutboundThirdPretreatmentSystemRateMedicalWastes;
    /**
     * 三期处置的散料占比
     */
    private float yearOutboundThirdPretreatmentSystemRateWastesBulk;
    /**
     * 三期处置的破碎料占比
     */
    private float yearOutboundThirdPretreatmentSystemRateWastesCrushing;
    /**
     * 三期处置的污泥占比
     */
    private float yearOutboundThirdPretreatmentSystemRateWastesSludge;
    /**
     * 三期处置的精馏残渣占比
     */
    private float yearOutboundThirdPretreatmentSystemRateWastesDistillation;
    /**
     * 三期处置的悬挂连占比
     */
    private float yearOutboundThirdPretreatmentSystemRateWastesSuspension;
    /**
     * 三期处置的废液占比
     */
    private float yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    /**
     * 三期处置的医废占比
     */
    private float yearOutboundThirdPretreatmentSystemRateMedicalWastes;

    // 设备运行情况
    // 本日
    /**
     * A2停止时间(h)
     */
    private float todayEquipmentA2StopTime;
    /**
     * B2
     */
    private float todayEquipmentB2StopTime;
    /**
     * 备2
     */
    private float todayEquipmentPrepare2StopTime;
    /**
     * 备2
     */
    private float todayEquipmentSecondaryStopTime;
    /**
     * 三期
     */
    private float todayEquipmentThirdStopTime;
    // 月累计
    /**
     * A2停止时间(h)
     */
    private float monthEquipmentA2StopTime;
    /**
     * B2
     */
    private float monthEquipmentB2StopTime;
    /**
     * 备2
     */
    private float monthEquipmentPrepare2StopTime;
    /**
     * 备2
     */
    private float monthEquipmentSecondaryStopTime;
    /**
     * 三期
     */
    private float monthEquipmentThirdStopTime;
    // 年累计
    /**
     * A2停止时间(h)
     */
    private float yearEquipmentA2StopTime;
    /**
     * B2
     */
    private float yearEquipmentB2StopTime;
    /**
     * 备2
     */
    private float yearEquipmentPrepare2StopTime;
    /**
     * 备2
     */
    private float yearEquipmentSecondaryStopTime;
    /**
     * 三期
     */
    private float yearEquipmentThirdStopTime;

    // 本日
    /**
     * A2运行时间(h)
     */
    private float todayEquipmentA2RunningTime;
    /**
     * B2
     */
    private float todayEquipmentB2RunningTime;
    /**
     * 备2
     */
    private float todayEquipmentPrepare2RunningTime;
    /**
     * 备2
     */
    private float todayEquipmentSecondaryRunningTime;
    /**
     * 三期
     */
    private float todayEquipmentThirdRunningTime;
    // 月累计
    /**
     * A2停止时间(h)
     */
    private float monthEquipmentA2RunningTime;
    /**
     * B2
     */
    private float monthEquipmentB2RunningTime;
    /**
     * 备2
     */
    private float monthEquipmentPrepare2RunningTime;
    /**
     * 备2
     */
    private float monthEquipmentSecondaryRunningTime;
    /**
     * 三期
     */
    private float monthEquipmentThirdRunningTime;
    // 年累计
    /**
     * A2停止时间(h)
     */
    private float yearEquipmentA2RunningTime;
    /**
     * B2
     */
    private float yearEquipmentB2RunningTime;
    /**
     * 备2
     */
    private float yearEquipmentPrepare2RunningTime;
    /**
     * 备2
     */
    private float yearEquipmentSecondaryRunningTime;
    /**
     * 三期
     */
    private float yearEquipmentThirdRunningTime;

    // 运转率
    // 本日
    /**
     * A2运转率
     */
    private float todayEquipmentA2RunningRate;
    /**
     * B2
     */
    private float todayEquipmentB2RunningRate;
    /**
     * 备2
     */
    private float todayEquipmentPrepare2RunningRate;
    /**
     * 备2
     */
    private float todayEquipmentSecondaryRunningRate;
    /**
     * 三期
     */
    private float todayEquipmentThirdRunningRate;
    // 月累计
    /**
     * A2停止时间(h)
     */
    private float monthEquipmentA2RunningRate;
    /**
     * B2
     */
    private float monthEquipmentB2RunningRate;
    /**
     * 备2
     */
    private float monthEquipmentPrepare2RunningRate;
    /**
     * 备2
     */
    private float monthEquipmentSecondaryRunningRate;
    /**
     * 三期
     */
    private float monthEquipmentThirdRunningRate;
    // 年累计
    /**
     * A2停止时间(h)
     */
    private float yearEquipmentA2RunningRate;
    /**
     * B2
     */
    private float yearEquipmentB2RunningRate;
    /**
     * 备2
     */
    private float yearEquipmentPrepare2RunningRate;
    /**
     * 备2
     */
    private float yearEquipmentSecondaryRunningRate;
    /**
     * 三期
     */
    private float yearEquipmentThirdRunningRate;

    // 炉渣飞灰产生明细
    // 当天
    /**
     * 二期炉渣
     */
    private float todayDisposalSecondarySlag;
    /**
     * 二期飞灰
     */
    private float todayDisposalSecondaryAsh;
    /**
     * 三期炉渣
     */
    private float todayDisposalThirdSlag;
    /**
     * 三期飞灰
     */
    private float todayDisposalThirdAsh;
    // 月累计
    /**
     * 二期炉渣
     */
    private float monthDisposalSecondarySlag;
    /**
     * 二期飞灰
     */
    private float monthDisposalSecondaryAsh;
    /**
     * 三期炉渣
     */
    private float monthDisposalThirdSlag;
    /**
     * 三期飞灰
     */
    private float monthDisposalThirdAsh;
    // 年累计
    /**
     * 二期炉渣
     */
    private float yearDisposalSecondarySlag;
    /**
     * 二期飞灰
     */
    private float yearDisposalSecondaryAsh;
    /**
     * 三期炉渣
     */
    private float yearDisposalThirdSlag;
    /**
     * 三期飞灰
     */
    private float yearDisposalThirdAsh;
    /**
     * 停车原因
     */
    private String parkingReason;
    /**
     * 其他事项
     */
    private String otherIssue;
    /**
     * 入库危废列表
     */
    private List<InboundOrderItem> inboundOrderItemList;
    /**
     * 出库危废列表
     */
    private List<OutboundOrder> outboundOrderA2List;

    private List<OutboundOrder> outboundOrderB2List;

    private List<OutboundOrder> outboundOrderPrepare2List;

    private List<OutboundOrder> outboundOrderThirdList;
    /**
     * 作者
     */
    private String author;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public float getTodayInboundMedicalWastes() {
        return todayInboundMedicalWastes;
    }

    public void setTodayInboundMedicalWastes(float todayInboundMedicalWastes) {
        this.todayInboundMedicalWastes = todayInboundMedicalWastes;
    }

    public float getTodayInboundMedicalWastesDirectDisposal() {
        return todayInboundMedicalWastesDirectDisposal;
    }

    public void setTodayInboundMedicalWastesDirectDisposal(float todayInboundMedicalWastesDirectDisposal) {
        this.todayInboundMedicalWastesDirectDisposal = todayInboundMedicalWastesDirectDisposal;
    }

    public float getTodayInboundMedicalWastesCooking() {
        return todayInboundMedicalWastesCooking;
    }

    public void setTodayInboundMedicalWastesCooking(float todayInboundMedicalWastesCooking) {
        this.todayInboundMedicalWastesCooking = todayInboundMedicalWastesCooking;
    }

    public float getTodayInboundMedicalWastesErrorNumber() {
        return todayInboundMedicalWastesErrorNumber;
    }

    public void setTodayInboundMedicalWastesErrorNumber(float todayInboundMedicalWastesErrorNumber) {
        this.todayInboundMedicalWastesErrorNumber = todayInboundMedicalWastesErrorNumber;
    }

    public float getTodayInboundMedicalWastesAfterCooking() {
        return todayInboundMedicalWastesAfterCooking;
    }

    public void setTodayInboundMedicalWastesAfterCooking(float todayInboundMedicalWastesAfterCooking) {
        this.todayInboundMedicalWastesAfterCooking = todayInboundMedicalWastesAfterCooking;
    }

    public float getTodayInboundMedicalWastesAfterCookingSend() {
        return todayInboundMedicalWastesAfterCookingSend;
    }

    public void setTodayInboundMedicalWastesAfterCookingSend(float todayInboundMedicalWastesAfterCookingSend) {
        this.todayInboundMedicalWastesAfterCookingSend = todayInboundMedicalWastesAfterCookingSend;
    }

    public float getTodayInboundMedicalWastesAfterCookingInbound() {
        return todayInboundMedicalWastesAfterCookingInbound;
    }

    public void setTodayInboundMedicalWastesAfterCookingInbound(float todayInboundMedicalWastesAfterCookingInbound) {
        this.todayInboundMedicalWastesAfterCookingInbound = todayInboundMedicalWastesAfterCookingInbound;
    }

    public float getTodayInboundMedicalWastesWetNumber() {
        return todayInboundMedicalWastesWetNumber;
    }

    public void setTodayInboundMedicalWastesWetNumber(float todayInboundMedicalWastesWetNumber) {
        this.todayInboundMedicalWastesWetNumber = todayInboundMedicalWastesWetNumber;
    }

    public float getTodayInboundWastesBulk() {
        return todayInboundWastesBulk;
    }

    public void setTodayInboundWastesBulk(float todayInboundWastesBulk) {
        this.todayInboundWastesBulk = todayInboundWastesBulk;
    }

    public float getTodayInboundWastesCrushing() {
        return todayInboundWastesCrushing;
    }

    public void setTodayInboundWastesCrushing(float todayInboundWastesCrushing) {
        this.todayInboundWastesCrushing = todayInboundWastesCrushing;
    }

    public float getTodayInboundWastesSludge() {
        return todayInboundWastesSludge;
    }

    public void setTodayInboundWastesSludge(float todayInboundWastesSludge) {
        this.todayInboundWastesSludge = todayInboundWastesSludge;
    }

    public float getTodayInboundWastesDistillation() {
        return todayInboundWastesDistillation;
    }

    public void setTodayInboundWastesDistillation(float todayInboundWastesDistillation) {
        this.todayInboundWastesDistillation = todayInboundWastesDistillation;
    }

    public float getTodayInboundWastesSuspension() {
        return todayInboundWastesSuspension;
    }

    public void setTodayInboundWastesSuspension(float todayInboundWastesSuspension) {
        this.todayInboundWastesSuspension = todayInboundWastesSuspension;
    }

    public float getTodayInboundWastesWasteLiquid() {
        return todayInboundWastesWasteLiquid;
    }

    public void setTodayInboundWastesWasteLiquid(float todayInboundWastesWasteLiquid) {
        this.todayInboundWastesWasteLiquid = todayInboundWastesWasteLiquid;
    }

    public float getTodayInboundWastesTotal() {
        return todayInboundWastesTotal;
    }

    public void setTodayInboundWastesTotal(float todayInboundWastesTotal) {
        this.todayInboundWastesTotal = todayInboundWastesTotal;
    }

    public float getTodayInboundSecondWastesSlag() {
        return todayInboundSecondWastesSlag;
    }

    public void setTodayInboundSecondWastesSlag(float todayInboundSecondWastesSlag) {
        this.todayInboundSecondWastesSlag = todayInboundSecondWastesSlag;
    }

    public float getTodayInboundSecondWastesAsh() {
        return todayInboundSecondWastesAsh;
    }

    public void setTodayInboundSecondWastesAsh(float todayInboundSecondWastesAsh) {
        this.todayInboundSecondWastesAsh = todayInboundSecondWastesAsh;
    }

    public float getTodayInboundSecondWastesBucket() {
        return todayInboundSecondWastesBucket;
    }

    public void setTodayInboundSecondWastesBucket(float todayInboundSecondWastesBucket) {
        this.todayInboundSecondWastesBucket = todayInboundSecondWastesBucket;
    }

    public float getTodayOutboundMedicalWastes() {
        return todayOutboundMedicalWastes;
    }

    public void setTodayOutboundMedicalWastes(float todayOutboundMedicalWastes) {
        this.todayOutboundMedicalWastes = todayOutboundMedicalWastes;
    }

    public float getTodayOutboundMedicalWastesDirectDisposal() {
        return todayOutboundMedicalWastesDirectDisposal;
    }

    public void setTodayOutboundMedicalWastesDirectDisposal(float todayOutboundMedicalWastesDirectDisposal) {
        this.todayOutboundMedicalWastesDirectDisposal = todayOutboundMedicalWastesDirectDisposal;
    }

    public float getTodayOutboundMedicalWastesCooking() {
        return todayOutboundMedicalWastesCooking;
    }

    public void setTodayOutboundMedicalWastesCooking(float todayOutboundMedicalWastesCooking) {
        this.todayOutboundMedicalWastesCooking = todayOutboundMedicalWastesCooking;
    }

    public float getTodayOutboundMedicalWastesErrorNumber() {
        return todayOutboundMedicalWastesErrorNumber;
    }

    public void setTodayOutboundMedicalWastesErrorNumber(float todayOutboundMedicalWastesErrorNumber) {
        this.todayOutboundMedicalWastesErrorNumber = todayOutboundMedicalWastesErrorNumber;
    }

    public float getTodayOutboundMedicalWastesAfterCooking() {
        return todayOutboundMedicalWastesAfterCooking;
    }

    public void setTodayOutboundMedicalWastesAfterCooking(float todayOutboundMedicalWastesAfterCooking) {
        this.todayOutboundMedicalWastesAfterCooking = todayOutboundMedicalWastesAfterCooking;
    }

    public float getTodayOutboundMedicalWastesAfterCookingSend() {
        return todayOutboundMedicalWastesAfterCookingSend;
    }

    public void setTodayOutboundMedicalWastesAfterCookingSend(float todayOutboundMedicalWastesAfterCookingSend) {
        this.todayOutboundMedicalWastesAfterCookingSend = todayOutboundMedicalWastesAfterCookingSend;
    }

    public float getTodayOutboundMedicalWastesAfterCookingInbound() {
        return todayOutboundMedicalWastesAfterCookingInbound;
    }

    public void setTodayOutboundMedicalWastesAfterCookingInbound(float todayOutboundMedicalWastesAfterCookingInbound) {
        this.todayOutboundMedicalWastesAfterCookingInbound = todayOutboundMedicalWastesAfterCookingInbound;
    }

    public float getTodayOutboundMedicalWastesWetNumber() {
        return todayOutboundMedicalWastesWetNumber;
    }

    public void setTodayOutboundMedicalWastesWetNumber(float todayOutboundMedicalWastesWetNumber) {
        this.todayOutboundMedicalWastesWetNumber = todayOutboundMedicalWastesWetNumber;
    }

    public float getTodayOutboundWastesBulk() {
        return todayOutboundWastesBulk;
    }

    public void setTodayOutboundWastesBulk(float todayOutboundWastesBulk) {
        this.todayOutboundWastesBulk = todayOutboundWastesBulk;
    }

    public float getTodayOutboundWastesCrushing() {
        return todayOutboundWastesCrushing;
    }

    public void setTodayOutboundWastesCrushing(float todayOutboundWastesCrushing) {
        this.todayOutboundWastesCrushing = todayOutboundWastesCrushing;
    }

    public float getTodayOutboundWastesSludge() {
        return todayOutboundWastesSludge;
    }

    public void setTodayOutboundWastesSludge(float todayOutboundWastesSludge) {
        this.todayOutboundWastesSludge = todayOutboundWastesSludge;
    }

    public float getTodayOutboundWastesDistillation() {
        return todayOutboundWastesDistillation;
    }

    public void setTodayOutboundWastesDistillation(float todayOutboundWastesDistillation) {
        this.todayOutboundWastesDistillation = todayOutboundWastesDistillation;
    }

    public float getTodayOutboundWastesSuspension() {
        return todayOutboundWastesSuspension;
    }

    public void setTodayOutboundWastesSuspension(float todayOutboundWastesSuspension) {
        this.todayOutboundWastesSuspension = todayOutboundWastesSuspension;
    }

    public float getTodayOutboundWastesWasteLiquid() {
        return todayOutboundWastesWasteLiquid;
    }

    public void setTodayOutboundWastesWasteLiquid(float todayOutboundWastesWasteLiquid) {
        this.todayOutboundWastesWasteLiquid = todayOutboundWastesWasteLiquid;
    }

    public float getTodayOutboundWastesTotal() {
        return todayOutboundWastesTotal;
    }

    public void setTodayOutboundWastesTotal(float todayOutboundWastesTotal) {
        this.todayOutboundWastesTotal = todayOutboundWastesTotal;
    }

    public float getTodayOutboundSecondWastesSlag() {
        return todayOutboundSecondWastesSlag;
    }

    public void setTodayOutboundSecondWastesSlag(float todayOutboundSecondWastesSlag) {
        this.todayOutboundSecondWastesSlag = todayOutboundSecondWastesSlag;
    }

    public float getTodayOutboundSecondWastesAsh() {
        return todayOutboundSecondWastesAsh;
    }

    public void setTodayOutboundSecondWastesAsh(float todayOutboundSecondWastesAsh) {
        this.todayOutboundSecondWastesAsh = todayOutboundSecondWastesAsh;
    }

    public float getTodayOutboundSecondWastesBucket() {
        return todayOutboundSecondWastesBucket;
    }

    public void setTodayOutboundSecondWastesBucket(float todayOutboundSecondWastesBucket) {
        this.todayOutboundSecondWastesBucket = todayOutboundSecondWastesBucket;
    }

    public float getMonthInboundMedicalWastes() {
        return monthInboundMedicalWastes;
    }

    public void setMonthInboundMedicalWastes(float monthInboundMedicalWastes) {
        this.monthInboundMedicalWastes = monthInboundMedicalWastes;
    }

    public float getMonthInboundMedicalWastesDirectDisposal() {
        return monthInboundMedicalWastesDirectDisposal;
    }

    public void setMonthInboundMedicalWastesDirectDisposal(float monthInboundMedicalWastesDirectDisposal) {
        this.monthInboundMedicalWastesDirectDisposal = monthInboundMedicalWastesDirectDisposal;
    }

    public float getMonthInboundMedicalWastesCooking() {
        return monthInboundMedicalWastesCooking;
    }

    public void setMonthInboundMedicalWastesCooking(float monthInboundMedicalWastesCooking) {
        this.monthInboundMedicalWastesCooking = monthInboundMedicalWastesCooking;
    }

    public float getMonthInboundMedicalWastesErrorNumber() {
        return monthInboundMedicalWastesErrorNumber;
    }

    public void setMonthInboundMedicalWastesErrorNumber(float monthInboundMedicalWastesErrorNumber) {
        this.monthInboundMedicalWastesErrorNumber = monthInboundMedicalWastesErrorNumber;
    }

    public float getMonthInboundMedicalWastesAfterCooking() {
        return monthInboundMedicalWastesAfterCooking;
    }

    public void setMonthInboundMedicalWastesAfterCooking(float monthInboundMedicalWastesAfterCooking) {
        this.monthInboundMedicalWastesAfterCooking = monthInboundMedicalWastesAfterCooking;
    }

    public float getMonthInboundMedicalWastesAfterCookingSend() {
        return monthInboundMedicalWastesAfterCookingSend;
    }

    public void setMonthInboundMedicalWastesAfterCookingSend(float monthInboundMedicalWastesAfterCookingSend) {
        this.monthInboundMedicalWastesAfterCookingSend = monthInboundMedicalWastesAfterCookingSend;
    }

    public float getMonthInboundMedicalWastesAfterCookingInbound() {
        return monthInboundMedicalWastesAfterCookingInbound;
    }

    public void setMonthInboundMedicalWastesAfterCookingInbound(float monthInboundMedicalWastesAfterCookingInbound) {
        this.monthInboundMedicalWastesAfterCookingInbound = monthInboundMedicalWastesAfterCookingInbound;
    }

    public float getMonthInboundMedicalWastesWetNumber() {
        return monthInboundMedicalWastesWetNumber;
    }

    public void setMonthInboundMedicalWastesWetNumber(float monthInboundMedicalWastesWetNumber) {
        this.monthInboundMedicalWastesWetNumber = monthInboundMedicalWastesWetNumber;
    }

    public float getMonthInboundWastesBulk() {
        return monthInboundWastesBulk;
    }

    public void setMonthInboundWastesBulk(float monthInboundWastesBulk) {
        this.monthInboundWastesBulk = monthInboundWastesBulk;
    }

    public float getMonthInboundWastesCrushing() {
        return monthInboundWastesCrushing;
    }

    public void setMonthInboundWastesCrushing(float monthInboundWastesCrushing) {
        this.monthInboundWastesCrushing = monthInboundWastesCrushing;
    }

    public float getMonthInboundWastesSludge() {
        return monthInboundWastesSludge;
    }

    public void setMonthInboundWastesSludge(float monthInboundWastesSludge) {
        this.monthInboundWastesSludge = monthInboundWastesSludge;
    }

    public float getMonthInboundWastesDistillation() {
        return monthInboundWastesDistillation;
    }

    public void setMonthInboundWastesDistillation(float monthInboundWastesDistillation) {
        this.monthInboundWastesDistillation = monthInboundWastesDistillation;
    }

    public float getMonthInboundWastesSuspension() {
        return monthInboundWastesSuspension;
    }

    public void setMonthInboundWastesSuspension(float monthInboundWastesSuspension) {
        this.monthInboundWastesSuspension = monthInboundWastesSuspension;
    }

    public float getMonthInboundWastesWasteLiquid() {
        return monthInboundWastesWasteLiquid;
    }

    public void setMonthInboundWastesWasteLiquid(float monthInboundWastesWasteLiquid) {
        this.monthInboundWastesWasteLiquid = monthInboundWastesWasteLiquid;
    }

    public float getMonthInboundWastesTotal() {
        return monthInboundWastesTotal;
    }

    public void setMonthInboundWastesTotal(float monthInboundWastesTotal) {
        this.monthInboundWastesTotal = monthInboundWastesTotal;
    }

    public float getMonthInboundSecondWastesSlag() {
        return monthInboundSecondWastesSlag;
    }

    public void setMonthInboundSecondWastesSlag(float monthInboundSecondWastesSlag) {
        this.monthInboundSecondWastesSlag = monthInboundSecondWastesSlag;
    }

    public float getMonthInboundSecondWastesAsh() {
        return monthInboundSecondWastesAsh;
    }

    public void setMonthInboundSecondWastesAsh(float monthInboundSecondWastesAsh) {
        this.monthInboundSecondWastesAsh = monthInboundSecondWastesAsh;
    }

    public float getMonthInboundSecondWastesBucket() {
        return monthInboundSecondWastesBucket;
    }

    public void setMonthInboundSecondWastesBucket(float monthInboundSecondWastesBucket) {
        this.monthInboundSecondWastesBucket = monthInboundSecondWastesBucket;
    }

    public float getMonthOutboundMedicalWastes() {
        return monthOutboundMedicalWastes;
    }

    public void setMonthOutboundMedicalWastes(float monthOutboundMedicalWastes) {
        this.monthOutboundMedicalWastes = monthOutboundMedicalWastes;
    }

    public float getMonthOutboundMedicalWastesDirectDisposal() {
        return monthOutboundMedicalWastesDirectDisposal;
    }

    public void setMonthOutboundMedicalWastesDirectDisposal(float monthOutboundMedicalWastesDirectDisposal) {
        this.monthOutboundMedicalWastesDirectDisposal = monthOutboundMedicalWastesDirectDisposal;
    }

    public float getMonthOutboundMedicalWastesCooking() {
        return monthOutboundMedicalWastesCooking;
    }

    public void setMonthOutboundMedicalWastesCooking(float monthOutboundMedicalWastesCooking) {
        this.monthOutboundMedicalWastesCooking = monthOutboundMedicalWastesCooking;
    }

    public float getMonthOutboundMedicalWastesErrorNumber() {
        return monthOutboundMedicalWastesErrorNumber;
    }

    public void setMonthOutboundMedicalWastesErrorNumber(float monthOutboundMedicalWastesErrorNumber) {
        this.monthOutboundMedicalWastesErrorNumber = monthOutboundMedicalWastesErrorNumber;
    }

    public float getMonthOutboundMedicalWastesAfterCooking() {
        return monthOutboundMedicalWastesAfterCooking;
    }

    public void setMonthOutboundMedicalWastesAfterCooking(float monthOutboundMedicalWastesAfterCooking) {
        this.monthOutboundMedicalWastesAfterCooking = monthOutboundMedicalWastesAfterCooking;
    }

    public float getMonthOutboundMedicalWastesAfterCookingSend() {
        return monthOutboundMedicalWastesAfterCookingSend;
    }

    public void setMonthOutboundMedicalWastesAfterCookingSend(float monthOutboundMedicalWastesAfterCookingSend) {
        this.monthOutboundMedicalWastesAfterCookingSend = monthOutboundMedicalWastesAfterCookingSend;
    }

    public float getMonthOutboundMedicalWastesAfterCookingInbound() {
        return monthOutboundMedicalWastesAfterCookingInbound;
    }

    public void setMonthOutboundMedicalWastesAfterCookingInbound(float monthOutboundMedicalWastesAfterCookingInbound) {
        this.monthOutboundMedicalWastesAfterCookingInbound = monthOutboundMedicalWastesAfterCookingInbound;
    }

    public float getMonthOutboundMedicalWastesWetNumber() {
        return monthOutboundMedicalWastesWetNumber;
    }

    public void setMonthOutboundMedicalWastesWetNumber(float monthOutboundMedicalWastesWetNumber) {
        this.monthOutboundMedicalWastesWetNumber = monthOutboundMedicalWastesWetNumber;
    }

    public float getMonthOutboundWastesBulk() {
        return monthOutboundWastesBulk;
    }

    public void setMonthOutboundWastesBulk(float monthOutboundWastesBulk) {
        this.monthOutboundWastesBulk = monthOutboundWastesBulk;
    }

    public float getMonthOutboundWastesCrushing() {
        return monthOutboundWastesCrushing;
    }

    public void setMonthOutboundWastesCrushing(float monthOutboundWastesCrushing) {
        this.monthOutboundWastesCrushing = monthOutboundWastesCrushing;
    }

    public float getMonthOutboundWastesSludge() {
        return monthOutboundWastesSludge;
    }

    public void setMonthOutboundWastesSludge(float monthOutboundWastesSludge) {
        this.monthOutboundWastesSludge = monthOutboundWastesSludge;
    }

    public float getMonthOutboundWastesDistillation() {
        return monthOutboundWastesDistillation;
    }

    public void setMonthOutboundWastesDistillation(float monthOutboundWastesDistillation) {
        this.monthOutboundWastesDistillation = monthOutboundWastesDistillation;
    }

    public float getMonthOutboundWastesSuspension() {
        return monthOutboundWastesSuspension;
    }

    public void setMonthOutboundWastesSuspension(float monthOutboundWastesSuspension) {
        this.monthOutboundWastesSuspension = monthOutboundWastesSuspension;
    }

    public float getMonthOutboundWastesWasteLiquid() {
        return monthOutboundWastesWasteLiquid;
    }

    public void setMonthOutboundWastesWasteLiquid(float monthOutboundWastesWasteLiquid) {
        this.monthOutboundWastesWasteLiquid = monthOutboundWastesWasteLiquid;
    }

    public float getMonthOutboundWastesTotal() {
        return monthOutboundWastesTotal;
    }

    public void setMonthOutboundWastesTotal(float monthOutboundWastesTotal) {
        this.monthOutboundWastesTotal = monthOutboundWastesTotal;
    }

    public float getMonthOutboundSecondWastesSlag() {
        return monthOutboundSecondWastesSlag;
    }

    public void setMonthOutboundSecondWastesSlag(float monthOutboundSecondWastesSlag) {
        this.monthOutboundSecondWastesSlag = monthOutboundSecondWastesSlag;
    }

    public float getMonthOutboundSecondWastesAsh() {
        return monthOutboundSecondWastesAsh;
    }

    public void setMonthOutboundSecondWastesAsh(float monthOutboundSecondWastesAsh) {
        this.monthOutboundSecondWastesAsh = monthOutboundSecondWastesAsh;
    }

    public float getMonthOutboundSecondWastesBucket() {
        return monthOutboundSecondWastesBucket;
    }

    public void setMonthOutboundSecondWastesBucket(float monthOutboundSecondWastesBucket) {
        this.monthOutboundSecondWastesBucket = monthOutboundSecondWastesBucket;
    }

    public float getYearInboundMedicalWastes() {
        return yearInboundMedicalWastes;
    }

    public void setYearInboundMedicalWastes(float yearInboundMedicalWastes) {
        this.yearInboundMedicalWastes = yearInboundMedicalWastes;
    }

    public float getYearInboundMedicalWastesDirectDisposal() {
        return yearInboundMedicalWastesDirectDisposal;
    }

    public void setYearInboundMedicalWastesDirectDisposal(float yearInboundMedicalWastesDirectDisposal) {
        this.yearInboundMedicalWastesDirectDisposal = yearInboundMedicalWastesDirectDisposal;
    }

    public float getYearInboundMedicalWastesCooking() {
        return yearInboundMedicalWastesCooking;
    }

    public void setYearInboundMedicalWastesCooking(float yearInboundMedicalWastesCooking) {
        this.yearInboundMedicalWastesCooking = yearInboundMedicalWastesCooking;
    }

    public float getYearInboundMedicalWastesErrorNumber() {
        return yearInboundMedicalWastesErrorNumber;
    }

    public void setYearInboundMedicalWastesErrorNumber(float yearInboundMedicalWastesErrorNumber) {
        this.yearInboundMedicalWastesErrorNumber = yearInboundMedicalWastesErrorNumber;
    }

    public float getYearInboundMedicalWastesAfterCooking() {
        return yearInboundMedicalWastesAfterCooking;
    }

    public void setYearInboundMedicalWastesAfterCooking(float yearInboundMedicalWastesAfterCooking) {
        this.yearInboundMedicalWastesAfterCooking = yearInboundMedicalWastesAfterCooking;
    }

    public float getYearInboundMedicalWastesAfterCookingSend() {
        return yearInboundMedicalWastesAfterCookingSend;
    }

    public void setYearInboundMedicalWastesAfterCookingSend(float yearInboundMedicalWastesAfterCookingSend) {
        this.yearInboundMedicalWastesAfterCookingSend = yearInboundMedicalWastesAfterCookingSend;
    }

    public float getYearInboundMedicalWastesAfterCookingInbound() {
        return yearInboundMedicalWastesAfterCookingInbound;
    }

    public void setYearInboundMedicalWastesAfterCookingInbound(float yearInboundMedicalWastesAfterCookingInbound) {
        this.yearInboundMedicalWastesAfterCookingInbound = yearInboundMedicalWastesAfterCookingInbound;
    }

    public float getYearInboundMedicalWastesWetNumber() {
        return yearInboundMedicalWastesWetNumber;
    }

    public void setYearInboundMedicalWastesWetNumber(float yearInboundMedicalWastesWetNumber) {
        this.yearInboundMedicalWastesWetNumber = yearInboundMedicalWastesWetNumber;
    }

    public float getYearInboundWastesBulk() {
        return yearInboundWastesBulk;
    }

    public void setYearInboundWastesBulk(float yearInboundWastesBulk) {
        this.yearInboundWastesBulk = yearInboundWastesBulk;
    }

    public float getYearInboundWastesCrushing() {
        return yearInboundWastesCrushing;
    }

    public void setYearInboundWastesCrushing(float yearInboundWastesCrushing) {
        this.yearInboundWastesCrushing = yearInboundWastesCrushing;
    }

    public float getYearInboundWastesSludge() {
        return yearInboundWastesSludge;
    }

    public void setYearInboundWastesSludge(float yearInboundWastesSludge) {
        this.yearInboundWastesSludge = yearInboundWastesSludge;
    }

    public float getYearInboundWastesDistillation() {
        return yearInboundWastesDistillation;
    }

    public void setYearInboundWastesDistillation(float yearInboundWastesDistillation) {
        this.yearInboundWastesDistillation = yearInboundWastesDistillation;
    }

    public float getYearInboundWastesSuspension() {
        return yearInboundWastesSuspension;
    }

    public void setYearInboundWastesSuspension(float yearInboundWastesSuspension) {
        this.yearInboundWastesSuspension = yearInboundWastesSuspension;
    }

    public float getYearInboundWastesWasteLiquid() {
        return yearInboundWastesWasteLiquid;
    }

    public void setYearInboundWastesWasteLiquid(float yearInboundWastesWasteLiquid) {
        this.yearInboundWastesWasteLiquid = yearInboundWastesWasteLiquid;
    }

    public float getYearInboundWastesTotal() {
        return yearInboundWastesTotal;
    }

    public void setYearInboundWastesTotal(float yearInboundWastesTotal) {
        this.yearInboundWastesTotal = yearInboundWastesTotal;
    }

    public float getYearInboundSecondWastesSlag() {
        return yearInboundSecondWastesSlag;
    }

    public void setYearInboundSecondWastesSlag(float yearInboundSecondWastesSlag) {
        this.yearInboundSecondWastesSlag = yearInboundSecondWastesSlag;
    }

    public float getYearInboundSecondWastesAsh() {
        return yearInboundSecondWastesAsh;
    }

    public void setYearInboundSecondWastesAsh(float yearInboundSecondWastesAsh) {
        this.yearInboundSecondWastesAsh = yearInboundSecondWastesAsh;
    }

    public float getYearInboundSecondWastesBucket() {
        return yearInboundSecondWastesBucket;
    }

    public void setYearInboundSecondWastesBucket(float yearInboundSecondWastesBucket) {
        this.yearInboundSecondWastesBucket = yearInboundSecondWastesBucket;
    }

    public float getYearOutboundMedicalWastes() {
        return yearOutboundMedicalWastes;
    }

    public void setYearOutboundMedicalWastes(float yearOutboundMedicalWastes) {
        this.yearOutboundMedicalWastes = yearOutboundMedicalWastes;
    }

    public float getYearOutboundMedicalWastesDirectDisposal() {
        return yearOutboundMedicalWastesDirectDisposal;
    }

    public void setYearOutboundMedicalWastesDirectDisposal(float yearOutboundMedicalWastesDirectDisposal) {
        this.yearOutboundMedicalWastesDirectDisposal = yearOutboundMedicalWastesDirectDisposal;
    }

    public float getYearOutboundMedicalWastesCooking() {
        return yearOutboundMedicalWastesCooking;
    }

    public void setYearOutboundMedicalWastesCooking(float yearOutboundMedicalWastesCooking) {
        this.yearOutboundMedicalWastesCooking = yearOutboundMedicalWastesCooking;
    }

    public float getYearOutboundMedicalWastesErrorNumber() {
        return yearOutboundMedicalWastesErrorNumber;
    }

    public void setYearOutboundMedicalWastesErrorNumber(float yearOutboundMedicalWastesErrorNumber) {
        this.yearOutboundMedicalWastesErrorNumber = yearOutboundMedicalWastesErrorNumber;
    }

    public float getYearOutboundMedicalWastesAfterCooking() {
        return yearOutboundMedicalWastesAfterCooking;
    }

    public void setYearOutboundMedicalWastesAfterCooking(float yearOutboundMedicalWastesAfterCooking) {
        this.yearOutboundMedicalWastesAfterCooking = yearOutboundMedicalWastesAfterCooking;
    }

    public float getYearOutboundMedicalWastesAfterCookingSend() {
        return yearOutboundMedicalWastesAfterCookingSend;
    }

    public void setYearOutboundMedicalWastesAfterCookingSend(float yearOutboundMedicalWastesAfterCookingSend) {
        this.yearOutboundMedicalWastesAfterCookingSend = yearOutboundMedicalWastesAfterCookingSend;
    }

    public float getYearOutboundMedicalWastesAfterCookingInbound() {
        return yearOutboundMedicalWastesAfterCookingInbound;
    }

    public void setYearOutboundMedicalWastesAfterCookingInbound(float yearOutboundMedicalWastesAfterCookingInbound) {
        this.yearOutboundMedicalWastesAfterCookingInbound = yearOutboundMedicalWastesAfterCookingInbound;
    }

    public float getYearOutboundMedicalWastesWetNumber() {
        return yearOutboundMedicalWastesWetNumber;
    }

    public void setYearOutboundMedicalWastesWetNumber(float yearOutboundMedicalWastesWetNumber) {
        this.yearOutboundMedicalWastesWetNumber = yearOutboundMedicalWastesWetNumber;
    }

    public float getYearOutboundWastesBulk() {
        return yearOutboundWastesBulk;
    }

    public void setYearOutboundWastesBulk(float yearOutboundWastesBulk) {
        this.yearOutboundWastesBulk = yearOutboundWastesBulk;
    }

    public float getYearOutboundWastesCrushing() {
        return yearOutboundWastesCrushing;
    }

    public void setYearOutboundWastesCrushing(float yearOutboundWastesCrushing) {
        this.yearOutboundWastesCrushing = yearOutboundWastesCrushing;
    }

    public float getYearOutboundWastesSludge() {
        return yearOutboundWastesSludge;
    }

    public void setYearOutboundWastesSludge(float yearOutboundWastesSludge) {
        this.yearOutboundWastesSludge = yearOutboundWastesSludge;
    }

    public float getYearOutboundWastesDistillation() {
        return yearOutboundWastesDistillation;
    }

    public void setYearOutboundWastesDistillation(float yearOutboundWastesDistillation) {
        this.yearOutboundWastesDistillation = yearOutboundWastesDistillation;
    }

    public float getYearOutboundWastesSuspension() {
        return yearOutboundWastesSuspension;
    }

    public void setYearOutboundWastesSuspension(float yearOutboundWastesSuspension) {
        this.yearOutboundWastesSuspension = yearOutboundWastesSuspension;
    }

    public float getYearOutboundWastesWasteLiquid() {
        return yearOutboundWastesWasteLiquid;
    }

    public void setYearOutboundWastesWasteLiquid(float yearOutboundWastesWasteLiquid) {
        this.yearOutboundWastesWasteLiquid = yearOutboundWastesWasteLiquid;
    }

    public float getYearOutboundWastesTotal() {
        return yearOutboundWastesTotal;
    }

    public void setYearOutboundWastesTotal(float yearOutboundWastesTotal) {
        this.yearOutboundWastesTotal = yearOutboundWastesTotal;
    }

    public float getYearOutboundSecondWastesSlag() {
        return yearOutboundSecondWastesSlag;
    }

    public void setYearOutboundSecondWastesSlag(float yearOutboundSecondWastesSlag) {
        this.yearOutboundSecondWastesSlag = yearOutboundSecondWastesSlag;
    }

    public float getYearOutboundSecondWastesAsh() {
        return yearOutboundSecondWastesAsh;
    }

    public void setYearOutboundSecondWastesAsh(float yearOutboundSecondWastesAsh) {
        this.yearOutboundSecondWastesAsh = yearOutboundSecondWastesAsh;
    }

    public float getYearOutboundSecondWastesBucket() {
        return yearOutboundSecondWastesBucket;
    }

    public void setYearOutboundSecondWastesBucket(float yearOutboundSecondWastesBucket) {
        this.yearOutboundSecondWastesBucket = yearOutboundSecondWastesBucket;
    }

    public float getMonthBalanceMedicalWastes() {
        return monthBalanceMedicalWastes;
    }

    public void setMonthBalanceMedicalWastes(float monthBalanceMedicalWastes) {
        this.monthBalanceMedicalWastes = monthBalanceMedicalWastes;
    }

    public float getMonthBalanceMedicalWastesDirectDisposal() {
        return monthBalanceMedicalWastesDirectDisposal;
    }

    public void setMonthBalanceMedicalWastesDirectDisposal(float monthBalanceMedicalWastesDirectDisposal) {
        this.monthBalanceMedicalWastesDirectDisposal = monthBalanceMedicalWastesDirectDisposal;
    }

    public float getMonthBalanceMedicalWastesCooking() {
        return monthBalanceMedicalWastesCooking;
    }

    public void setMonthBalanceMedicalWastesCooking(float monthBalanceMedicalWastesCooking) {
        this.monthBalanceMedicalWastesCooking = monthBalanceMedicalWastesCooking;
    }

    public float getMonthBalanceMedicalWastesErrorNumber() {
        return monthBalanceMedicalWastesErrorNumber;
    }

    public void setMonthBalanceMedicalWastesErrorNumber(float monthBalanceMedicalWastesErrorNumber) {
        this.monthBalanceMedicalWastesErrorNumber = monthBalanceMedicalWastesErrorNumber;
    }

    public float getMonthBalanceMedicalWastesAfterCooking() {
        return monthBalanceMedicalWastesAfterCooking;
    }

    public void setMonthBalanceMedicalWastesAfterCooking(float monthBalanceMedicalWastesAfterCooking) {
        this.monthBalanceMedicalWastesAfterCooking = monthBalanceMedicalWastesAfterCooking;
    }

    public float getMonthBalanceMedicalWastesAfterCookingSend() {
        return monthBalanceMedicalWastesAfterCookingSend;
    }

    public void setMonthBalanceMedicalWastesAfterCookingSend(float monthBalanceMedicalWastesAfterCookingSend) {
        this.monthBalanceMedicalWastesAfterCookingSend = monthBalanceMedicalWastesAfterCookingSend;
    }

    public float getMonthBalanceMedicalWastesAfterCookingInbound() {
        return monthBalanceMedicalWastesAfterCookingInbound;
    }

    public void setMonthBalanceMedicalWastesAfterCookingInbound(float monthBalanceMedicalWastesAfterCookingInbound) {
        this.monthBalanceMedicalWastesAfterCookingInbound = monthBalanceMedicalWastesAfterCookingInbound;
    }

    public float getMonthBalanceMedicalWastesWetNumber() {
        return monthBalanceMedicalWastesWetNumber;
    }

    public void setMonthBalanceMedicalWastesWetNumber(float monthBalanceMedicalWastesWetNumber) {
        this.monthBalanceMedicalWastesWetNumber = monthBalanceMedicalWastesWetNumber;
    }

    public float getMonthBalanceWastesBulk() {
        return monthBalanceWastesBulk;
    }

    public void setMonthBalanceWastesBulk(float monthBalanceWastesBulk) {
        this.monthBalanceWastesBulk = monthBalanceWastesBulk;
    }

    public float getMonthBalanceWastesCrushing() {
        return monthBalanceWastesCrushing;
    }

    public void setMonthBalanceWastesCrushing(float monthBalanceWastesCrushing) {
        this.monthBalanceWastesCrushing = monthBalanceWastesCrushing;
    }

    public float getMonthBalanceWastesSludge() {
        return monthBalanceWastesSludge;
    }

    public void setMonthBalanceWastesSludge(float monthBalanceWastesSludge) {
        this.monthBalanceWastesSludge = monthBalanceWastesSludge;
    }

    public float getMonthBalanceWastesDistillation() {
        return monthBalanceWastesDistillation;
    }

    public void setMonthBalanceWastesDistillation(float monthBalanceWastesDistillation) {
        this.monthBalanceWastesDistillation = monthBalanceWastesDistillation;
    }

    public float getMonthBalanceWastesSuspension() {
        return monthBalanceWastesSuspension;
    }

    public void setMonthBalanceWastesSuspension(float monthBalanceWastesSuspension) {
        this.monthBalanceWastesSuspension = monthBalanceWastesSuspension;
    }

    public float getMonthBalanceWastesWasteLiquid() {
        return monthBalanceWastesWasteLiquid;
    }

    public void setMonthBalanceWastesWasteLiquid(float monthBalanceWastesWasteLiquid) {
        this.monthBalanceWastesWasteLiquid = monthBalanceWastesWasteLiquid;
    }

    public float getMonthBalanceWastesTotal() {
        return monthBalanceWastesTotal;
    }

    public void setMonthBalanceWastesTotal(float monthBalanceWastesTotal) {
        this.monthBalanceWastesTotal = monthBalanceWastesTotal;
    }

    public float getMonthBalanceSecondWastesSlag() {
        return monthBalanceSecondWastesSlag;
    }

    public void setMonthBalanceSecondWastesSlag(float monthBalanceSecondWastesSlag) {
        this.monthBalanceSecondWastesSlag = monthBalanceSecondWastesSlag;
    }

    public float getMonthBalanceSecondWastesAsh() {
        return monthBalanceSecondWastesAsh;
    }

    public void setMonthBalanceSecondWastesAsh(float monthBalanceSecondWastesAsh) {
        this.monthBalanceSecondWastesAsh = monthBalanceSecondWastesAsh;
    }

    public float getMonthBalanceSecondWastesBucket() {
        return monthBalanceSecondWastesBucket;
    }

    public void setMonthBalanceSecondWastesBucket(float monthBalanceSecondWastesBucket) {
        this.monthBalanceSecondWastesBucket = monthBalanceSecondWastesBucket;
    }

    public float getTodayInventoryMedicalWastes() {
        return todayInventoryMedicalWastes;
    }

    public void setTodayInventoryMedicalWastes(float todayInventoryMedicalWastes) {
        this.todayInventoryMedicalWastes = todayInventoryMedicalWastes;
    }

    public float getTodayInventoryMedicalWastesDirectDisposal() {
        return todayInventoryMedicalWastesDirectDisposal;
    }

    public void setTodayInventoryMedicalWastesDirectDisposal(float todayInventoryMedicalWastesDirectDisposal) {
        this.todayInventoryMedicalWastesDirectDisposal = todayInventoryMedicalWastesDirectDisposal;
    }

    public float getTodayInventoryMedicalWastesCooking() {
        return todayInventoryMedicalWastesCooking;
    }

    public void setTodayInventoryMedicalWastesCooking(float todayInventoryMedicalWastesCooking) {
        this.todayInventoryMedicalWastesCooking = todayInventoryMedicalWastesCooking;
    }

    public float getTodayInventoryMedicalWastesErrorNumber() {
        return todayInventoryMedicalWastesErrorNumber;
    }

    public void setTodayInventoryMedicalWastesErrorNumber(float todayInventoryMedicalWastesErrorNumber) {
        this.todayInventoryMedicalWastesErrorNumber = todayInventoryMedicalWastesErrorNumber;
    }

    public float getTodayInventoryMedicalWastesAfterCooking() {
        return todayInventoryMedicalWastesAfterCooking;
    }

    public void setTodayInventoryMedicalWastesAfterCooking(float todayInventoryMedicalWastesAfterCooking) {
        this.todayInventoryMedicalWastesAfterCooking = todayInventoryMedicalWastesAfterCooking;
    }

    public float getTodayInventoryMedicalWastesAfterCookingSend() {
        return todayInventoryMedicalWastesAfterCookingSend;
    }

    public void setTodayInventoryMedicalWastesAfterCookingSend(float todayInventoryMedicalWastesAfterCookingSend) {
        this.todayInventoryMedicalWastesAfterCookingSend = todayInventoryMedicalWastesAfterCookingSend;
    }

    public float getTodayInventoryMedicalWastesAfterCookingInbound() {
        return todayInventoryMedicalWastesAfterCookingInbound;
    }

    public void setTodayInventoryMedicalWastesAfterCookingInbound(float todayInventoryMedicalWastesAfterCookingInbound) {
        this.todayInventoryMedicalWastesAfterCookingInbound = todayInventoryMedicalWastesAfterCookingInbound;
    }

    public float getTodayInventoryMedicalWastesWetNumber() {
        return todayInventoryMedicalWastesWetNumber;
    }

    public void setTodayInventoryMedicalWastesWetNumber(float todayInventoryMedicalWastesWetNumber) {
        this.todayInventoryMedicalWastesWetNumber = todayInventoryMedicalWastesWetNumber;
    }

    public float getTodayInventoryWastesBulk() {
        return todayInventoryWastesBulk;
    }

    public void setTodayInventoryWastesBulk(float todayInventoryWastesBulk) {
        this.todayInventoryWastesBulk = todayInventoryWastesBulk;
    }

    public float getTodayInventoryWastesCrushing() {
        return todayInventoryWastesCrushing;
    }

    public void setTodayInventoryWastesCrushing(float todayInventoryWastesCrushing) {
        this.todayInventoryWastesCrushing = todayInventoryWastesCrushing;
    }

    public float getTodayInventoryWastesSludge() {
        return todayInventoryWastesSludge;
    }

    public void setTodayInventoryWastesSludge(float todayInventoryWastesSludge) {
        this.todayInventoryWastesSludge = todayInventoryWastesSludge;
    }

    public float getTodayInventoryWastesDistillation() {
        return todayInventoryWastesDistillation;
    }

    public void setTodayInventoryWastesDistillation(float todayInventoryWastesDistillation) {
        this.todayInventoryWastesDistillation = todayInventoryWastesDistillation;
    }

    public float getTodayInventoryWastesSuspension() {
        return todayInventoryWastesSuspension;
    }

    public void setTodayInventoryWastesSuspension(float todayInventoryWastesSuspension) {
        this.todayInventoryWastesSuspension = todayInventoryWastesSuspension;
    }

    public float getTodayInventoryWastesWasteLiquid() {
        return todayInventoryWastesWasteLiquid;
    }

    public void setTodayInventoryWastesWasteLiquid(float todayInventoryWastesWasteLiquid) {
        this.todayInventoryWastesWasteLiquid = todayInventoryWastesWasteLiquid;
    }

    public float getTodayInventoryWastesTotal() {
        return todayInventoryWastesTotal;
    }

    public void setTodayInventoryWastesTotal(float todayInventoryWastesTotal) {
        this.todayInventoryWastesTotal = todayInventoryWastesTotal;
    }

    public float getTodayInventorySecondWastesSlag() {
        return todayInventorySecondWastesSlag;
    }

    public void setTodayInventorySecondWastesSlag(float todayInventorySecondWastesSlag) {
        this.todayInventorySecondWastesSlag = todayInventorySecondWastesSlag;
    }

    public float getTodayInventorySecondWastesAsh() {
        return todayInventorySecondWastesAsh;
    }

    public void setTodayInventorySecondWastesAsh(float todayInventorySecondWastesAsh) {
        this.todayInventorySecondWastesAsh = todayInventorySecondWastesAsh;
    }

    public float getTodayInventorySecondWastesBucket() {
        return todayInventorySecondWastesBucket;
    }

    public void setTodayInventorySecondWastesBucket(float todayInventorySecondWastesBucket) {
        this.todayInventorySecondWastesBucket = todayInventorySecondWastesBucket;
    }

    public float getTodayDisposalMedicalWastes() {
        return todayDisposalMedicalWastes;
    }

    public void setTodayDisposalMedicalWastes(float todayDisposalMedicalWastes) {
        this.todayDisposalMedicalWastes = todayDisposalMedicalWastes;
    }

    public float getTodayDisposalMedicalWastesDisposalDirect() {
        return todayDisposalMedicalWastesDisposalDirect;
    }

    public void setTodayDisposalMedicalWastesDisposalDirect(float todayDisposalMedicalWastesDisposalDirect) {
        this.todayDisposalMedicalWastesDisposalDirect = todayDisposalMedicalWastesDisposalDirect;
    }

    public float getTodayDisposalMedicalWastesCooking() {
        return todayDisposalMedicalWastesCooking;
    }

    public void setTodayDisposalMedicalWastesCooking(float todayDisposalMedicalWastesCooking) {
        this.todayDisposalMedicalWastesCooking = todayDisposalMedicalWastesCooking;
    }

    public float getTodayDisposalMedicalWastesErrorNumber() {
        return todayDisposalMedicalWastesErrorNumber;
    }

    public void setTodayDisposalMedicalWastesErrorNumber(float todayDisposalMedicalWastesErrorNumber) {
        this.todayDisposalMedicalWastesErrorNumber = todayDisposalMedicalWastesErrorNumber;
    }

    public float getTodayDisposalMedicalWastesAfterCooking() {
        return todayDisposalMedicalWastesAfterCooking;
    }

    public void setTodayDisposalMedicalWastesAfterCooking(float todayDisposalMedicalWastesAfterCooking) {
        this.todayDisposalMedicalWastesAfterCooking = todayDisposalMedicalWastesAfterCooking;
    }

    public float getTodayDisposalMedicalWastesAfterCookingSend() {
        return todayDisposalMedicalWastesAfterCookingSend;
    }

    public void setTodayDisposalMedicalWastesAfterCookingSend(float todayDisposalMedicalWastesAfterCookingSend) {
        this.todayDisposalMedicalWastesAfterCookingSend = todayDisposalMedicalWastesAfterCookingSend;
    }

    public float getTodayDisposalMedicalWastesAfterCookingInbound() {
        return todayDisposalMedicalWastesAfterCookingInbound;
    }

    public void setTodayDisposalMedicalWastesAfterCookingInbound(float todayDisposalMedicalWastesAfterCookingInbound) {
        this.todayDisposalMedicalWastesAfterCookingInbound = todayDisposalMedicalWastesAfterCookingInbound;
    }

    public float getTodayDisposalMedicalWastesWetNumber() {
        return todayDisposalMedicalWastesWetNumber;
    }

    public void setTodayDisposalMedicalWastesWetNumber(float todayDisposalMedicalWastesWetNumber) {
        this.todayDisposalMedicalWastesWetNumber = todayDisposalMedicalWastesWetNumber;
    }

    public float getTodayInboundAuxiliaryCalcareousLime() {
        return todayInboundAuxiliaryCalcareousLime;
    }

    public void setTodayInboundAuxiliaryCalcareousLime(float todayInboundAuxiliaryCalcareousLime) {
        this.todayInboundAuxiliaryCalcareousLime = todayInboundAuxiliaryCalcareousLime;
    }

    public float getTodayInboundAuxiliaryCommonActivatedCarbon() {
        return todayInboundAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayInboundAuxiliaryCommonActivatedCarbon(float todayInboundAuxiliaryCommonActivatedCarbon) {
        this.todayInboundAuxiliaryCommonActivatedCarbon = todayInboundAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayInboundAuxiliaryActivatedCarbon() {
        return todayInboundAuxiliaryActivatedCarbon;
    }

    public void setTodayInboundAuxiliaryActivatedCarbon(float todayInboundAuxiliaryActivatedCarbon) {
        this.todayInboundAuxiliaryActivatedCarbon = todayInboundAuxiliaryActivatedCarbon;
    }

    public float getTodayInboundAuxiliaryActivatedCarbonParticles() {
        return todayInboundAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayInboundAuxiliaryActivatedCarbonParticles(float todayInboundAuxiliaryActivatedCarbonParticles) {
        this.todayInboundAuxiliaryActivatedCarbonParticles = todayInboundAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayInboundAuxiliaryLye() {
        return todayInboundAuxiliaryLye;
    }

    public void setTodayInboundAuxiliaryLye(float todayInboundAuxiliaryLye) {
        this.todayInboundAuxiliaryLye = todayInboundAuxiliaryLye;
    }

    public float getTodayInboundAuxiliaryCausticSoda() {
        return todayInboundAuxiliaryCausticSoda;
    }

    public void setTodayInboundAuxiliaryCausticSoda(float todayInboundAuxiliaryCausticSoda) {
        this.todayInboundAuxiliaryCausticSoda = todayInboundAuxiliaryCausticSoda;
    }

    public float getTodayInboundAuxiliaryUrea() {
        return todayInboundAuxiliaryUrea;
    }

    public void setTodayInboundAuxiliaryUrea(float todayInboundAuxiliaryUrea) {
        this.todayInboundAuxiliaryUrea = todayInboundAuxiliaryUrea;
    }

    public float getTodayInboundAuxiliaryHydrochloricAcid() {
        return todayInboundAuxiliaryHydrochloricAcid;
    }

    public void setTodayInboundAuxiliaryHydrochloricAcid(float todayInboundAuxiliaryHydrochloricAcid) {
        this.todayInboundAuxiliaryHydrochloricAcid = todayInboundAuxiliaryHydrochloricAcid;
    }

    public float getTodayInboundAuxiliaryNahco3() {
        return todayInboundAuxiliaryNahco3;
    }

    public void setTodayInboundAuxiliaryNahco3(float todayInboundAuxiliaryNahco3) {
        this.todayInboundAuxiliaryNahco3 = todayInboundAuxiliaryNahco3;
    }

    public float getTodayInboundAuxiliaryFlour() {
        return todayInboundAuxiliaryFlour;
    }

    public void setTodayInboundAuxiliaryFlour(float todayInboundAuxiliaryFlour) {
        this.todayInboundAuxiliaryFlour = todayInboundAuxiliaryFlour;
    }

    public float getTodayInboundAuxiliaryDefoamer() {
        return todayInboundAuxiliaryDefoamer;
    }

    public void setTodayInboundAuxiliaryDefoamer(float todayInboundAuxiliaryDefoamer) {
        this.todayInboundAuxiliaryDefoamer = todayInboundAuxiliaryDefoamer;
    }

    public float getTodayInboundAuxiliaryFlocculant() {
        return todayInboundAuxiliaryFlocculant;
    }

    public void setTodayInboundAuxiliaryFlocculant(float todayInboundAuxiliaryFlocculant) {
        this.todayInboundAuxiliaryFlocculant = todayInboundAuxiliaryFlocculant;
    }

    public float getTodayInboundAuxiliarySoftWaterReducingAgent() {
        return todayInboundAuxiliarySoftWaterReducingAgent;
    }

    public void setTodayInboundAuxiliarySoftWaterReducingAgent(float todayInboundAuxiliarySoftWaterReducingAgent) {
        this.todayInboundAuxiliarySoftWaterReducingAgent = todayInboundAuxiliarySoftWaterReducingAgent;
    }

    public float getTodayInboundAuxiliarySoftWaterScaleInhibitor() {
        return todayInboundAuxiliarySoftWaterScaleInhibitor;
    }

    public void setTodayInboundAuxiliarySoftWaterScaleInhibitor(float todayInboundAuxiliarySoftWaterScaleInhibitor) {
        this.todayInboundAuxiliarySoftWaterScaleInhibitor = todayInboundAuxiliarySoftWaterScaleInhibitor;
    }

    public float getTodayInboundAuxiliaryAmmonia() {
        return todayInboundAuxiliaryAmmonia;
    }

    public void setTodayInboundAuxiliaryAmmonia(float todayInboundAuxiliaryAmmonia) {
        this.todayInboundAuxiliaryAmmonia = todayInboundAuxiliaryAmmonia;
    }

    public float getTodayInboundAuxiliaryWaterReducingAgent() {
        return todayInboundAuxiliaryWaterReducingAgent;
    }

    public void setTodayInboundAuxiliaryWaterReducingAgent(float todayInboundAuxiliaryWaterReducingAgent) {
        this.todayInboundAuxiliaryWaterReducingAgent = todayInboundAuxiliaryWaterReducingAgent;
    }

    public float getTodayInboundAuxiliaryWaterScaleInhibitor() {
        return todayInboundAuxiliaryWaterScaleInhibitor;
    }

    public void setTodayInboundAuxiliaryWaterScaleInhibitor(float todayInboundAuxiliaryWaterScaleInhibitor) {
        this.todayInboundAuxiliaryWaterScaleInhibitor = todayInboundAuxiliaryWaterScaleInhibitor;
    }

    public float getTodayInboundAuxiliaryNaclo() {
        return todayInboundAuxiliaryNaclo;
    }

    public void setTodayInboundAuxiliaryNaclo(float todayInboundAuxiliaryNaclo) {
        this.todayInboundAuxiliaryNaclo = todayInboundAuxiliaryNaclo;
    }

    public float getTodayInboundAuxiliaryDeodorant() {
        return todayInboundAuxiliaryDeodorant;
    }

    public void setTodayInboundAuxiliaryDeodorant(float todayInboundAuxiliaryDeodorant) {
        this.todayInboundAuxiliaryDeodorant = todayInboundAuxiliaryDeodorant;
    }

    public float getTodayInboundAuxiliarySalt() {
        return todayInboundAuxiliarySalt;
    }

    public void setTodayInboundAuxiliarySalt(float todayInboundAuxiliarySalt) {
        this.todayInboundAuxiliarySalt = todayInboundAuxiliarySalt;
    }

    public float getTodayInboundAuxiliarySlagBag() {
        return todayInboundAuxiliarySlagBag;
    }

    public void setTodayInboundAuxiliarySlagBag(float todayInboundAuxiliarySlagBag) {
        this.todayInboundAuxiliarySlagBag = todayInboundAuxiliarySlagBag;
    }

    public float getTodayInboundAuxiliaryFlyAshBag() {
        return todayInboundAuxiliaryFlyAshBag;
    }

    public void setTodayInboundAuxiliaryFlyAshBag(float todayInboundAuxiliaryFlyAshBag) {
        this.todayInboundAuxiliaryFlyAshBag = todayInboundAuxiliaryFlyAshBag;
    }

    public float getTodayInboundAuxiliaryMedicalWastesBag() {
        return todayInboundAuxiliaryMedicalWastesBag;
    }

    public void setTodayInboundAuxiliaryMedicalWastesBag(float todayInboundAuxiliaryMedicalWastesBag) {
        this.todayInboundAuxiliaryMedicalWastesBag = todayInboundAuxiliaryMedicalWastesBag;
    }

    public float getTodayInboundAuxiliaryMedicalPackingPlasticBag() {
        return todayInboundAuxiliaryMedicalPackingPlasticBag;
    }

    public void setTodayInboundAuxiliaryMedicalPackingPlasticBag(float todayInboundAuxiliaryMedicalPackingPlasticBag) {
        this.todayInboundAuxiliaryMedicalPackingPlasticBag = todayInboundAuxiliaryMedicalPackingPlasticBag;
    }

    public float getTodayInboundAuxiliaryCollectionBox() {
        return todayInboundAuxiliaryCollectionBox;
    }

    public void setTodayInboundAuxiliaryCollectionBox(float todayInboundAuxiliaryCollectionBox) {
        this.todayInboundAuxiliaryCollectionBox = todayInboundAuxiliaryCollectionBox;
    }

    public float getTodayInboundAuxiliaryStandardBox() {
        return todayInboundAuxiliaryStandardBox;
    }

    public void setTodayInboundAuxiliaryStandardBox(float todayInboundAuxiliaryStandardBox) {
        this.todayInboundAuxiliaryStandardBox = todayInboundAuxiliaryStandardBox;
    }

    public float getTodayInboundAuxiliaryWoodenPallets() {
        return todayInboundAuxiliaryWoodenPallets;
    }

    public void setTodayInboundAuxiliaryWoodenPallets(float todayInboundAuxiliaryWoodenPallets) {
        this.todayInboundAuxiliaryWoodenPallets = todayInboundAuxiliaryWoodenPallets;
    }

    public float getTodayInboundAuxiliaryStandardTray_1m() {
        return todayInboundAuxiliaryStandardTray_1m;
    }

    public void setTodayInboundAuxiliaryStandardTray_1m(float todayInboundAuxiliaryStandardTray_1m) {
        this.todayInboundAuxiliaryStandardTray_1m = todayInboundAuxiliaryStandardTray_1m;
    }

    public float getTodayInboundAuxiliaryStandardTray_1_2m() {
        return todayInboundAuxiliaryStandardTray_1_2m;
    }

    public void setTodayInboundAuxiliaryStandardTray_1_2m(float todayInboundAuxiliaryStandardTray_1_2m) {
        this.todayInboundAuxiliaryStandardTray_1_2m = todayInboundAuxiliaryStandardTray_1_2m;
    }

    public float getTodayInboundAuxiliaryTonBox() {
        return todayInboundAuxiliaryTonBox;
    }

    public void setTodayInboundAuxiliaryTonBox(float todayInboundAuxiliaryTonBox) {
        this.todayInboundAuxiliaryTonBox = todayInboundAuxiliaryTonBox;
    }

    public float getTodayInboundAuxiliarySteam() {
        return todayInboundAuxiliarySteam;
    }

    public void setTodayInboundAuxiliarySteam(float todayInboundAuxiliarySteam) {
        this.todayInboundAuxiliarySteam = todayInboundAuxiliarySteam;
    }

    public float getTodayInboundAuxiliaryDieselOil() {
        return todayInboundAuxiliaryDieselOil;
    }

    public void setTodayInboundAuxiliaryDieselOil(float todayInboundAuxiliaryDieselOil) {
        this.todayInboundAuxiliaryDieselOil = todayInboundAuxiliaryDieselOil;
    }

    public float getTodayInboundAuxiliaryNaturalGas() {
        return todayInboundAuxiliaryNaturalGas;
    }

    public void setTodayInboundAuxiliaryNaturalGas(float todayInboundAuxiliaryNaturalGas) {
        this.todayInboundAuxiliaryNaturalGas = todayInboundAuxiliaryNaturalGas;
    }

    public float getTodayInboundAuxiliaryElectricQuantity() {
        return todayInboundAuxiliaryElectricQuantity;
    }

    public void setTodayInboundAuxiliaryElectricQuantity(float todayInboundAuxiliaryElectricQuantity) {
        this.todayInboundAuxiliaryElectricQuantity = todayInboundAuxiliaryElectricQuantity;
    }

    public float getTodayInboundAuxiliaryIndustrialWater() {
        return todayInboundAuxiliaryIndustrialWater;
    }

    public void setTodayInboundAuxiliaryIndustrialWater(float todayInboundAuxiliaryIndustrialWater) {
        this.todayInboundAuxiliaryIndustrialWater = todayInboundAuxiliaryIndustrialWater;
    }

    public float getTodayInboundAuxiliaryTapWaterQuantity() {
        return todayInboundAuxiliaryTapWaterQuantity;
    }

    public void setTodayInboundAuxiliaryTapWaterQuantity(float todayInboundAuxiliaryTapWaterQuantity) {
        this.todayInboundAuxiliaryTapWaterQuantity = todayInboundAuxiliaryTapWaterQuantity;
    }

    public float getMonthInboundAuxiliaryCalcareousLime() {
        return monthInboundAuxiliaryCalcareousLime;
    }

    public void setMonthInboundAuxiliaryCalcareousLime(float monthInboundAuxiliaryCalcareousLime) {
        this.monthInboundAuxiliaryCalcareousLime = monthInboundAuxiliaryCalcareousLime;
    }

    public float getMonthInboundAuxiliaryCommonActivatedCarbon() {
        return monthInboundAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthInboundAuxiliaryCommonActivatedCarbon(float monthInboundAuxiliaryCommonActivatedCarbon) {
        this.monthInboundAuxiliaryCommonActivatedCarbon = monthInboundAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthInboundAuxiliaryActivatedCarbon() {
        return monthInboundAuxiliaryActivatedCarbon;
    }

    public void setMonthInboundAuxiliaryActivatedCarbon(float monthInboundAuxiliaryActivatedCarbon) {
        this.monthInboundAuxiliaryActivatedCarbon = monthInboundAuxiliaryActivatedCarbon;
    }

    public float getMonthInboundAuxiliaryActivatedCarbonParticles() {
        return monthInboundAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthInboundAuxiliaryActivatedCarbonParticles(float monthInboundAuxiliaryActivatedCarbonParticles) {
        this.monthInboundAuxiliaryActivatedCarbonParticles = monthInboundAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthInboundAuxiliaryLye() {
        return monthInboundAuxiliaryLye;
    }

    public void setMonthInboundAuxiliaryLye(float monthInboundAuxiliaryLye) {
        this.monthInboundAuxiliaryLye = monthInboundAuxiliaryLye;
    }

    public float getMonthInboundAuxiliaryCausticSoda() {
        return monthInboundAuxiliaryCausticSoda;
    }

    public void setMonthInboundAuxiliaryCausticSoda(float monthInboundAuxiliaryCausticSoda) {
        this.monthInboundAuxiliaryCausticSoda = monthInboundAuxiliaryCausticSoda;
    }

    public float getMonthInboundAuxiliaryUrea() {
        return monthInboundAuxiliaryUrea;
    }

    public void setMonthInboundAuxiliaryUrea(float monthInboundAuxiliaryUrea) {
        this.monthInboundAuxiliaryUrea = monthInboundAuxiliaryUrea;
    }

    public float getMonthInboundAuxiliaryHydrochloricAcid() {
        return monthInboundAuxiliaryHydrochloricAcid;
    }

    public void setMonthInboundAuxiliaryHydrochloricAcid(float monthInboundAuxiliaryHydrochloricAcid) {
        this.monthInboundAuxiliaryHydrochloricAcid = monthInboundAuxiliaryHydrochloricAcid;
    }

    public float getMonthInboundAuxiliaryNahco3() {
        return monthInboundAuxiliaryNahco3;
    }

    public void setMonthInboundAuxiliaryNahco3(float monthInboundAuxiliaryNahco3) {
        this.monthInboundAuxiliaryNahco3 = monthInboundAuxiliaryNahco3;
    }

    public float getMonthInboundAuxiliaryFlour() {
        return monthInboundAuxiliaryFlour;
    }

    public void setMonthInboundAuxiliaryFlour(float monthInboundAuxiliaryFlour) {
        this.monthInboundAuxiliaryFlour = monthInboundAuxiliaryFlour;
    }

    public float getMonthInboundAuxiliaryDefoamer() {
        return monthInboundAuxiliaryDefoamer;
    }

    public void setMonthInboundAuxiliaryDefoamer(float monthInboundAuxiliaryDefoamer) {
        this.monthInboundAuxiliaryDefoamer = monthInboundAuxiliaryDefoamer;
    }

    public float getMonthInboundAuxiliaryFlocculant() {
        return monthInboundAuxiliaryFlocculant;
    }

    public void setMonthInboundAuxiliaryFlocculant(float monthInboundAuxiliaryFlocculant) {
        this.monthInboundAuxiliaryFlocculant = monthInboundAuxiliaryFlocculant;
    }

    public float getMonthInboundAuxiliarySoftWaterReducingAgent() {
        return monthInboundAuxiliarySoftWaterReducingAgent;
    }

    public void setMonthInboundAuxiliarySoftWaterReducingAgent(float monthInboundAuxiliarySoftWaterReducingAgent) {
        this.monthInboundAuxiliarySoftWaterReducingAgent = monthInboundAuxiliarySoftWaterReducingAgent;
    }

    public float getMonthInboundAuxiliarySoftWaterScaleInhibitor() {
        return monthInboundAuxiliarySoftWaterScaleInhibitor;
    }

    public void setMonthInboundAuxiliarySoftWaterScaleInhibitor(float monthInboundAuxiliarySoftWaterScaleInhibitor) {
        this.monthInboundAuxiliarySoftWaterScaleInhibitor = monthInboundAuxiliarySoftWaterScaleInhibitor;
    }

    public float getMonthInboundAuxiliaryAmmonia() {
        return monthInboundAuxiliaryAmmonia;
    }

    public void setMonthInboundAuxiliaryAmmonia(float monthInboundAuxiliaryAmmonia) {
        this.monthInboundAuxiliaryAmmonia = monthInboundAuxiliaryAmmonia;
    }

    public float getMonthInboundAuxiliaryWaterReducingAgent() {
        return monthInboundAuxiliaryWaterReducingAgent;
    }

    public void setMonthInboundAuxiliaryWaterReducingAgent(float monthInboundAuxiliaryWaterReducingAgent) {
        this.monthInboundAuxiliaryWaterReducingAgent = monthInboundAuxiliaryWaterReducingAgent;
    }

    public float getMonthInboundAuxiliaryWaterScaleInhibitor() {
        return monthInboundAuxiliaryWaterScaleInhibitor;
    }

    public void setMonthInboundAuxiliaryWaterScaleInhibitor(float monthInboundAuxiliaryWaterScaleInhibitor) {
        this.monthInboundAuxiliaryWaterScaleInhibitor = monthInboundAuxiliaryWaterScaleInhibitor;
    }

    public float getMonthInboundAuxiliaryNaclo() {
        return monthInboundAuxiliaryNaclo;
    }

    public void setMonthInboundAuxiliaryNaclo(float monthInboundAuxiliaryNaclo) {
        this.monthInboundAuxiliaryNaclo = monthInboundAuxiliaryNaclo;
    }

    public float getMonthInboundAuxiliaryDeodorant() {
        return monthInboundAuxiliaryDeodorant;
    }

    public void setMonthInboundAuxiliaryDeodorant(float monthInboundAuxiliaryDeodorant) {
        this.monthInboundAuxiliaryDeodorant = monthInboundAuxiliaryDeodorant;
    }

    public float getMonthInboundAuxiliarySalt() {
        return monthInboundAuxiliarySalt;
    }

    public void setMonthInboundAuxiliarySalt(float monthInboundAuxiliarySalt) {
        this.monthInboundAuxiliarySalt = monthInboundAuxiliarySalt;
    }

    public float getMonthInboundAuxiliarySlagBag() {
        return monthInboundAuxiliarySlagBag;
    }

    public void setMonthInboundAuxiliarySlagBag(float monthInboundAuxiliarySlagBag) {
        this.monthInboundAuxiliarySlagBag = monthInboundAuxiliarySlagBag;
    }

    public float getMonthInboundAuxiliaryFlyAshBag() {
        return monthInboundAuxiliaryFlyAshBag;
    }

    public void setMonthInboundAuxiliaryFlyAshBag(float monthInboundAuxiliaryFlyAshBag) {
        this.monthInboundAuxiliaryFlyAshBag = monthInboundAuxiliaryFlyAshBag;
    }

    public float getMonthInboundAuxiliaryMedicalWastesBag() {
        return monthInboundAuxiliaryMedicalWastesBag;
    }

    public void setMonthInboundAuxiliaryMedicalWastesBag(float monthInboundAuxiliaryMedicalWastesBag) {
        this.monthInboundAuxiliaryMedicalWastesBag = monthInboundAuxiliaryMedicalWastesBag;
    }

    public float getMonthInboundAuxiliaryMedicalPackingPlasticBag() {
        return monthInboundAuxiliaryMedicalPackingPlasticBag;
    }

    public void setMonthInboundAuxiliaryMedicalPackingPlasticBag(float monthInboundAuxiliaryMedicalPackingPlasticBag) {
        this.monthInboundAuxiliaryMedicalPackingPlasticBag = monthInboundAuxiliaryMedicalPackingPlasticBag;
    }

    public float getMonthInboundAuxiliaryCollectionBox() {
        return monthInboundAuxiliaryCollectionBox;
    }

    public void setMonthInboundAuxiliaryCollectionBox(float monthInboundAuxiliaryCollectionBox) {
        this.monthInboundAuxiliaryCollectionBox = monthInboundAuxiliaryCollectionBox;
    }

    public float getMonthInboundAuxiliaryStandardBox() {
        return monthInboundAuxiliaryStandardBox;
    }

    public void setMonthInboundAuxiliaryStandardBox(float monthInboundAuxiliaryStandardBox) {
        this.monthInboundAuxiliaryStandardBox = monthInboundAuxiliaryStandardBox;
    }

    public float getMonthInboundAuxiliaryWoodenPallets() {
        return monthInboundAuxiliaryWoodenPallets;
    }

    public void setMonthInboundAuxiliaryWoodenPallets(float monthInboundAuxiliaryWoodenPallets) {
        this.monthInboundAuxiliaryWoodenPallets = monthInboundAuxiliaryWoodenPallets;
    }

    public float getMonthInboundAuxiliaryStandardTray_1m() {
        return monthInboundAuxiliaryStandardTray_1m;
    }

    public void setMonthInboundAuxiliaryStandardTray_1m(float monthInboundAuxiliaryStandardTray_1m) {
        this.monthInboundAuxiliaryStandardTray_1m = monthInboundAuxiliaryStandardTray_1m;
    }

    public float getMonthInboundAuxiliaryStandardTray_1_2m() {
        return monthInboundAuxiliaryStandardTray_1_2m;
    }

    public void setMonthInboundAuxiliaryStandardTray_1_2m(float monthInboundAuxiliaryStandardTray_1_2m) {
        this.monthInboundAuxiliaryStandardTray_1_2m = monthInboundAuxiliaryStandardTray_1_2m;
    }

    public float getMonthInboundAuxiliaryTonBox() {
        return monthInboundAuxiliaryTonBox;
    }

    public void setMonthInboundAuxiliaryTonBox(float monthInboundAuxiliaryTonBox) {
        this.monthInboundAuxiliaryTonBox = monthInboundAuxiliaryTonBox;
    }

    public float getMonthInboundAuxiliarySteam() {
        return monthInboundAuxiliarySteam;
    }

    public void setMonthInboundAuxiliarySteam(float monthInboundAuxiliarySteam) {
        this.monthInboundAuxiliarySteam = monthInboundAuxiliarySteam;
    }

    public float getMonthInboundAuxiliaryDieselOil() {
        return monthInboundAuxiliaryDieselOil;
    }

    public void setMonthInboundAuxiliaryDieselOil(float monthInboundAuxiliaryDieselOil) {
        this.monthInboundAuxiliaryDieselOil = monthInboundAuxiliaryDieselOil;
    }

    public float getMonthInboundAuxiliaryNaturalGas() {
        return monthInboundAuxiliaryNaturalGas;
    }

    public void setMonthInboundAuxiliaryNaturalGas(float monthInboundAuxiliaryNaturalGas) {
        this.monthInboundAuxiliaryNaturalGas = monthInboundAuxiliaryNaturalGas;
    }

    public float getMonthInboundAuxiliaryElectricQuantity() {
        return monthInboundAuxiliaryElectricQuantity;
    }

    public void setMonthInboundAuxiliaryElectricQuantity(float monthInboundAuxiliaryElectricQuantity) {
        this.monthInboundAuxiliaryElectricQuantity = monthInboundAuxiliaryElectricQuantity;
    }

    public float getMonthInboundAuxiliaryIndustrialWater() {
        return monthInboundAuxiliaryIndustrialWater;
    }

    public void setMonthInboundAuxiliaryIndustrialWater(float monthInboundAuxiliaryIndustrialWater) {
        this.monthInboundAuxiliaryIndustrialWater = monthInboundAuxiliaryIndustrialWater;
    }

    public float getMonthInboundAuxiliaryTapWaterQuantity() {
        return monthInboundAuxiliaryTapWaterQuantity;
    }

    public void setMonthInboundAuxiliaryTapWaterQuantity(float monthInboundAuxiliaryTapWaterQuantity) {
        this.monthInboundAuxiliaryTapWaterQuantity = monthInboundAuxiliaryTapWaterQuantity;
    }

    public float getYearInboundAuxiliaryCalcareousLime() {
        return yearInboundAuxiliaryCalcareousLime;
    }

    public void setYearInboundAuxiliaryCalcareousLime(float yearInboundAuxiliaryCalcareousLime) {
        this.yearInboundAuxiliaryCalcareousLime = yearInboundAuxiliaryCalcareousLime;
    }

    public float getYearInboundAuxiliaryCommonActivatedCarbon() {
        return yearInboundAuxiliaryCommonActivatedCarbon;
    }

    public void setYearInboundAuxiliaryCommonActivatedCarbon(float yearInboundAuxiliaryCommonActivatedCarbon) {
        this.yearInboundAuxiliaryCommonActivatedCarbon = yearInboundAuxiliaryCommonActivatedCarbon;
    }

    public float getYearInboundAuxiliaryActivatedCarbon() {
        return yearInboundAuxiliaryActivatedCarbon;
    }

    public void setYearInboundAuxiliaryActivatedCarbon(float yearInboundAuxiliaryActivatedCarbon) {
        this.yearInboundAuxiliaryActivatedCarbon = yearInboundAuxiliaryActivatedCarbon;
    }

    public float getYearInboundAuxiliaryActivatedCarbonParticles() {
        return yearInboundAuxiliaryActivatedCarbonParticles;
    }

    public void setYearInboundAuxiliaryActivatedCarbonParticles(float yearInboundAuxiliaryActivatedCarbonParticles) {
        this.yearInboundAuxiliaryActivatedCarbonParticles = yearInboundAuxiliaryActivatedCarbonParticles;
    }

    public float getYearInboundAuxiliaryLye() {
        return yearInboundAuxiliaryLye;
    }

    public void setYearInboundAuxiliaryLye(float yearInboundAuxiliaryLye) {
        this.yearInboundAuxiliaryLye = yearInboundAuxiliaryLye;
    }

    public float getYearInboundAuxiliaryCausticSoda() {
        return yearInboundAuxiliaryCausticSoda;
    }

    public void setYearInboundAuxiliaryCausticSoda(float yearInboundAuxiliaryCausticSoda) {
        this.yearInboundAuxiliaryCausticSoda = yearInboundAuxiliaryCausticSoda;
    }

    public float getYearInboundAuxiliaryUrea() {
        return yearInboundAuxiliaryUrea;
    }

    public void setYearInboundAuxiliaryUrea(float yearInboundAuxiliaryUrea) {
        this.yearInboundAuxiliaryUrea = yearInboundAuxiliaryUrea;
    }

    public float getYearInboundAuxiliaryHydrochloricAcid() {
        return yearInboundAuxiliaryHydrochloricAcid;
    }

    public void setYearInboundAuxiliaryHydrochloricAcid(float yearInboundAuxiliaryHydrochloricAcid) {
        this.yearInboundAuxiliaryHydrochloricAcid = yearInboundAuxiliaryHydrochloricAcid;
    }

    public float getYearInboundAuxiliaryNahco3() {
        return yearInboundAuxiliaryNahco3;
    }

    public void setYearInboundAuxiliaryNahco3(float yearInboundAuxiliaryNahco3) {
        this.yearInboundAuxiliaryNahco3 = yearInboundAuxiliaryNahco3;
    }

    public float getYearInboundAuxiliaryFlour() {
        return yearInboundAuxiliaryFlour;
    }

    public void setYearInboundAuxiliaryFlour(float yearInboundAuxiliaryFlour) {
        this.yearInboundAuxiliaryFlour = yearInboundAuxiliaryFlour;
    }

    public float getYearInboundAuxiliaryDefoamer() {
        return yearInboundAuxiliaryDefoamer;
    }

    public void setYearInboundAuxiliaryDefoamer(float yearInboundAuxiliaryDefoamer) {
        this.yearInboundAuxiliaryDefoamer = yearInboundAuxiliaryDefoamer;
    }

    public float getYearInboundAuxiliaryFlocculant() {
        return yearInboundAuxiliaryFlocculant;
    }

    public void setYearInboundAuxiliaryFlocculant(float yearInboundAuxiliaryFlocculant) {
        this.yearInboundAuxiliaryFlocculant = yearInboundAuxiliaryFlocculant;
    }

    public float getYearInboundAuxiliarySoftWaterReducingAgent() {
        return yearInboundAuxiliarySoftWaterReducingAgent;
    }

    public void setYearInboundAuxiliarySoftWaterReducingAgent(float yearInboundAuxiliarySoftWaterReducingAgent) {
        this.yearInboundAuxiliarySoftWaterReducingAgent = yearInboundAuxiliarySoftWaterReducingAgent;
    }

    public float getYearInboundAuxiliarySoftWaterScaleInhibitor() {
        return yearInboundAuxiliarySoftWaterScaleInhibitor;
    }

    public void setYearInboundAuxiliarySoftWaterScaleInhibitor(float yearInboundAuxiliarySoftWaterScaleInhibitor) {
        this.yearInboundAuxiliarySoftWaterScaleInhibitor = yearInboundAuxiliarySoftWaterScaleInhibitor;
    }

    public float getYearInboundAuxiliaryAmmonia() {
        return yearInboundAuxiliaryAmmonia;
    }

    public void setYearInboundAuxiliaryAmmonia(float yearInboundAuxiliaryAmmonia) {
        this.yearInboundAuxiliaryAmmonia = yearInboundAuxiliaryAmmonia;
    }

    public float getYearInboundAuxiliaryWaterReducingAgent() {
        return yearInboundAuxiliaryWaterReducingAgent;
    }

    public void setYearInboundAuxiliaryWaterReducingAgent(float yearInboundAuxiliaryWaterReducingAgent) {
        this.yearInboundAuxiliaryWaterReducingAgent = yearInboundAuxiliaryWaterReducingAgent;
    }

    public float getYearInboundAuxiliaryWaterScaleInhibitor() {
        return yearInboundAuxiliaryWaterScaleInhibitor;
    }

    public void setYearInboundAuxiliaryWaterScaleInhibitor(float yearInboundAuxiliaryWaterScaleInhibitor) {
        this.yearInboundAuxiliaryWaterScaleInhibitor = yearInboundAuxiliaryWaterScaleInhibitor;
    }

    public float getYearInboundAuxiliaryNaclo() {
        return yearInboundAuxiliaryNaclo;
    }

    public void setYearInboundAuxiliaryNaclo(float yearInboundAuxiliaryNaclo) {
        this.yearInboundAuxiliaryNaclo = yearInboundAuxiliaryNaclo;
    }

    public float getYearInboundAuxiliaryDeodorant() {
        return yearInboundAuxiliaryDeodorant;
    }

    public void setYearInboundAuxiliaryDeodorant(float yearInboundAuxiliaryDeodorant) {
        this.yearInboundAuxiliaryDeodorant = yearInboundAuxiliaryDeodorant;
    }

    public float getYearInboundAuxiliarySalt() {
        return yearInboundAuxiliarySalt;
    }

    public void setYearInboundAuxiliarySalt(float yearInboundAuxiliarySalt) {
        this.yearInboundAuxiliarySalt = yearInboundAuxiliarySalt;
    }

    public float getYearInboundAuxiliarySlagBag() {
        return yearInboundAuxiliarySlagBag;
    }

    public void setYearInboundAuxiliarySlagBag(float yearInboundAuxiliarySlagBag) {
        this.yearInboundAuxiliarySlagBag = yearInboundAuxiliarySlagBag;
    }

    public float getYearInboundAuxiliaryFlyAshBag() {
        return yearInboundAuxiliaryFlyAshBag;
    }

    public void setYearInboundAuxiliaryFlyAshBag(float yearInboundAuxiliaryFlyAshBag) {
        this.yearInboundAuxiliaryFlyAshBag = yearInboundAuxiliaryFlyAshBag;
    }

    public float getYearInboundAuxiliaryMedicalWastesBag() {
        return yearInboundAuxiliaryMedicalWastesBag;
    }

    public void setYearInboundAuxiliaryMedicalWastesBag(float yearInboundAuxiliaryMedicalWastesBag) {
        this.yearInboundAuxiliaryMedicalWastesBag = yearInboundAuxiliaryMedicalWastesBag;
    }

    public float getYearInboundAuxiliaryMedicalPackingPlasticBag() {
        return yearInboundAuxiliaryMedicalPackingPlasticBag;
    }

    public void setYearInboundAuxiliaryMedicalPackingPlasticBag(float yearInboundAuxiliaryMedicalPackingPlasticBag) {
        this.yearInboundAuxiliaryMedicalPackingPlasticBag = yearInboundAuxiliaryMedicalPackingPlasticBag;
    }

    public float getYearInboundAuxiliaryCollectionBox() {
        return yearInboundAuxiliaryCollectionBox;
    }

    public void setYearInboundAuxiliaryCollectionBox(float yearInboundAuxiliaryCollectionBox) {
        this.yearInboundAuxiliaryCollectionBox = yearInboundAuxiliaryCollectionBox;
    }

    public float getYearInboundAuxiliaryStandardBox() {
        return yearInboundAuxiliaryStandardBox;
    }

    public void setYearInboundAuxiliaryStandardBox(float yearInboundAuxiliaryStandardBox) {
        this.yearInboundAuxiliaryStandardBox = yearInboundAuxiliaryStandardBox;
    }

    public float getYearInboundAuxiliaryWoodenPallets() {
        return yearInboundAuxiliaryWoodenPallets;
    }

    public void setYearInboundAuxiliaryWoodenPallets(float yearInboundAuxiliaryWoodenPallets) {
        this.yearInboundAuxiliaryWoodenPallets = yearInboundAuxiliaryWoodenPallets;
    }

    public float getYearInboundAuxiliaryStandardTray_1m() {
        return yearInboundAuxiliaryStandardTray_1m;
    }

    public void setYearInboundAuxiliaryStandardTray_1m(float yearInboundAuxiliaryStandardTray_1m) {
        this.yearInboundAuxiliaryStandardTray_1m = yearInboundAuxiliaryStandardTray_1m;
    }

    public float getYearInboundAuxiliaryStandardTray_1_2m() {
        return yearInboundAuxiliaryStandardTray_1_2m;
    }

    public void setYearInboundAuxiliaryStandardTray_1_2m(float yearInboundAuxiliaryStandardTray_1_2m) {
        this.yearInboundAuxiliaryStandardTray_1_2m = yearInboundAuxiliaryStandardTray_1_2m;
    }

    public float getYearInboundAuxiliaryTonBox() {
        return yearInboundAuxiliaryTonBox;
    }

    public void setYearInboundAuxiliaryTonBox(float yearInboundAuxiliaryTonBox) {
        this.yearInboundAuxiliaryTonBox = yearInboundAuxiliaryTonBox;
    }

    public float getYearInboundAuxiliarySteam() {
        return yearInboundAuxiliarySteam;
    }

    public void setYearInboundAuxiliarySteam(float yearInboundAuxiliarySteam) {
        this.yearInboundAuxiliarySteam = yearInboundAuxiliarySteam;
    }

    public float getYearInboundAuxiliaryDieselOil() {
        return yearInboundAuxiliaryDieselOil;
    }

    public void setYearInboundAuxiliaryDieselOil(float yearInboundAuxiliaryDieselOil) {
        this.yearInboundAuxiliaryDieselOil = yearInboundAuxiliaryDieselOil;
    }

    public float getYearInboundAuxiliaryNaturalGas() {
        return yearInboundAuxiliaryNaturalGas;
    }

    public void setYearInboundAuxiliaryNaturalGas(float yearInboundAuxiliaryNaturalGas) {
        this.yearInboundAuxiliaryNaturalGas = yearInboundAuxiliaryNaturalGas;
    }

    public float getYearInboundAuxiliaryElectricQuantity() {
        return yearInboundAuxiliaryElectricQuantity;
    }

    public void setYearInboundAuxiliaryElectricQuantity(float yearInboundAuxiliaryElectricQuantity) {
        this.yearInboundAuxiliaryElectricQuantity = yearInboundAuxiliaryElectricQuantity;
    }

    public float getYearInboundAuxiliaryIndustrialWater() {
        return yearInboundAuxiliaryIndustrialWater;
    }

    public void setYearInboundAuxiliaryIndustrialWater(float yearInboundAuxiliaryIndustrialWater) {
        this.yearInboundAuxiliaryIndustrialWater = yearInboundAuxiliaryIndustrialWater;
    }

    public float getYearInboundAuxiliaryTapWaterQuantity() {
        return yearInboundAuxiliaryTapWaterQuantity;
    }

    public void setYearInboundAuxiliaryTapWaterQuantity(float yearInboundAuxiliaryTapWaterQuantity) {
        this.yearInboundAuxiliaryTapWaterQuantity = yearInboundAuxiliaryTapWaterQuantity;
    }

    public float getTodayOutboundAuxiliaryCalcareousLime() {
        return todayOutboundAuxiliaryCalcareousLime;
    }

    public void setTodayOutboundAuxiliaryCalcareousLime(float todayOutboundAuxiliaryCalcareousLime) {
        this.todayOutboundAuxiliaryCalcareousLime = todayOutboundAuxiliaryCalcareousLime;
    }

    public float getTodayOutboundAuxiliaryCommonActivatedCarbon() {
        return todayOutboundAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayOutboundAuxiliaryCommonActivatedCarbon(float todayOutboundAuxiliaryCommonActivatedCarbon) {
        this.todayOutboundAuxiliaryCommonActivatedCarbon = todayOutboundAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayOutboundAuxiliaryActivatedCarbon() {
        return todayOutboundAuxiliaryActivatedCarbon;
    }

    public void setTodayOutboundAuxiliaryActivatedCarbon(float todayOutboundAuxiliaryActivatedCarbon) {
        this.todayOutboundAuxiliaryActivatedCarbon = todayOutboundAuxiliaryActivatedCarbon;
    }

    public float getTodayOutboundAuxiliaryActivatedCarbonParticles() {
        return todayOutboundAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayOutboundAuxiliaryActivatedCarbonParticles(float todayOutboundAuxiliaryActivatedCarbonParticles) {
        this.todayOutboundAuxiliaryActivatedCarbonParticles = todayOutboundAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayOutboundAuxiliaryLye() {
        return todayOutboundAuxiliaryLye;
    }

    public void setTodayOutboundAuxiliaryLye(float todayOutboundAuxiliaryLye) {
        this.todayOutboundAuxiliaryLye = todayOutboundAuxiliaryLye;
    }

    public float getTodayOutboundAuxiliaryCausticSoda() {
        return todayOutboundAuxiliaryCausticSoda;
    }

    public void setTodayOutboundAuxiliaryCausticSoda(float todayOutboundAuxiliaryCausticSoda) {
        this.todayOutboundAuxiliaryCausticSoda = todayOutboundAuxiliaryCausticSoda;
    }

    public float getTodayOutboundAuxiliaryUrea() {
        return todayOutboundAuxiliaryUrea;
    }

    public void setTodayOutboundAuxiliaryUrea(float todayOutboundAuxiliaryUrea) {
        this.todayOutboundAuxiliaryUrea = todayOutboundAuxiliaryUrea;
    }

    public float getTodayOutboundAuxiliaryHydrochloricAcid() {
        return todayOutboundAuxiliaryHydrochloricAcid;
    }

    public void setTodayOutboundAuxiliaryHydrochloricAcid(float todayOutboundAuxiliaryHydrochloricAcid) {
        this.todayOutboundAuxiliaryHydrochloricAcid = todayOutboundAuxiliaryHydrochloricAcid;
    }

    public float getTodayOutboundAuxiliaryNahco3() {
        return todayOutboundAuxiliaryNahco3;
    }

    public void setTodayOutboundAuxiliaryNahco3(float todayOutboundAuxiliaryNahco3) {
        this.todayOutboundAuxiliaryNahco3 = todayOutboundAuxiliaryNahco3;
    }

    public float getTodayOutboundAuxiliaryFlour() {
        return todayOutboundAuxiliaryFlour;
    }

    public void setTodayOutboundAuxiliaryFlour(float todayOutboundAuxiliaryFlour) {
        this.todayOutboundAuxiliaryFlour = todayOutboundAuxiliaryFlour;
    }

    public float getTodayOutboundAuxiliaryDefoamer() {
        return todayOutboundAuxiliaryDefoamer;
    }

    public void setTodayOutboundAuxiliaryDefoamer(float todayOutboundAuxiliaryDefoamer) {
        this.todayOutboundAuxiliaryDefoamer = todayOutboundAuxiliaryDefoamer;
    }

    public float getTodayOutboundAuxiliaryFlocculant() {
        return todayOutboundAuxiliaryFlocculant;
    }

    public void setTodayOutboundAuxiliaryFlocculant(float todayOutboundAuxiliaryFlocculant) {
        this.todayOutboundAuxiliaryFlocculant = todayOutboundAuxiliaryFlocculant;
    }

    public float getTodayOutboundAuxiliarySoftWaterReducingAgent() {
        return todayOutboundAuxiliarySoftWaterReducingAgent;
    }

    public void setTodayOutboundAuxiliarySoftWaterReducingAgent(float todayOutboundAuxiliarySoftWaterReducingAgent) {
        this.todayOutboundAuxiliarySoftWaterReducingAgent = todayOutboundAuxiliarySoftWaterReducingAgent;
    }

    public float getTodayOutboundAuxiliarySoftWaterScaleInhibitor() {
        return todayOutboundAuxiliarySoftWaterScaleInhibitor;
    }

    public void setTodayOutboundAuxiliarySoftWaterScaleInhibitor(float todayOutboundAuxiliarySoftWaterScaleInhibitor) {
        this.todayOutboundAuxiliarySoftWaterScaleInhibitor = todayOutboundAuxiliarySoftWaterScaleInhibitor;
    }

    public float getTodayOutboundAuxiliaryAmmonia() {
        return todayOutboundAuxiliaryAmmonia;
    }

    public void setTodayOutboundAuxiliaryAmmonia(float todayOutboundAuxiliaryAmmonia) {
        this.todayOutboundAuxiliaryAmmonia = todayOutboundAuxiliaryAmmonia;
    }

    public float getTodayOutboundAuxiliaryWaterReducingAgent() {
        return todayOutboundAuxiliaryWaterReducingAgent;
    }

    public void setTodayOutboundAuxiliaryWaterReducingAgent(float todayOutboundAuxiliaryWaterReducingAgent) {
        this.todayOutboundAuxiliaryWaterReducingAgent = todayOutboundAuxiliaryWaterReducingAgent;
    }

    public float getTodayOutboundAuxiliaryWaterScaleInhibitor() {
        return todayOutboundAuxiliaryWaterScaleInhibitor;
    }

    public void setTodayOutboundAuxiliaryWaterScaleInhibitor(float todayOutboundAuxiliaryWaterScaleInhibitor) {
        this.todayOutboundAuxiliaryWaterScaleInhibitor = todayOutboundAuxiliaryWaterScaleInhibitor;
    }

    public float getTodayOutboundAuxiliaryNaclo() {
        return todayOutboundAuxiliaryNaclo;
    }

    public void setTodayOutboundAuxiliaryNaclo(float todayOutboundAuxiliaryNaclo) {
        this.todayOutboundAuxiliaryNaclo = todayOutboundAuxiliaryNaclo;
    }

    public float getTodayOutboundAuxiliaryDeodorant() {
        return todayOutboundAuxiliaryDeodorant;
    }

    public void setTodayOutboundAuxiliaryDeodorant(float todayOutboundAuxiliaryDeodorant) {
        this.todayOutboundAuxiliaryDeodorant = todayOutboundAuxiliaryDeodorant;
    }

    public float getTodayOutboundAuxiliarySalt() {
        return todayOutboundAuxiliarySalt;
    }

    public void setTodayOutboundAuxiliarySalt(float todayOutboundAuxiliarySalt) {
        this.todayOutboundAuxiliarySalt = todayOutboundAuxiliarySalt;
    }

    public float getTodayOutboundAuxiliarySlagBag() {
        return todayOutboundAuxiliarySlagBag;
    }

    public void setTodayOutboundAuxiliarySlagBag(float todayOutboundAuxiliarySlagBag) {
        this.todayOutboundAuxiliarySlagBag = todayOutboundAuxiliarySlagBag;
    }

    public float getTodayOutboundAuxiliaryFlyAshBag() {
        return todayOutboundAuxiliaryFlyAshBag;
    }

    public void setTodayOutboundAuxiliaryFlyAshBag(float todayOutboundAuxiliaryFlyAshBag) {
        this.todayOutboundAuxiliaryFlyAshBag = todayOutboundAuxiliaryFlyAshBag;
    }

    public float getTodayOutboundAuxiliaryMedicalWastesBag() {
        return todayOutboundAuxiliaryMedicalWastesBag;
    }

    public void setTodayOutboundAuxiliaryMedicalWastesBag(float todayOutboundAuxiliaryMedicalWastesBag) {
        this.todayOutboundAuxiliaryMedicalWastesBag = todayOutboundAuxiliaryMedicalWastesBag;
    }

    public float getTodayOutboundAuxiliaryMedicalPackingPlasticBag() {
        return todayOutboundAuxiliaryMedicalPackingPlasticBag;
    }

    public void setTodayOutboundAuxiliaryMedicalPackingPlasticBag(float todayOutboundAuxiliaryMedicalPackingPlasticBag) {
        this.todayOutboundAuxiliaryMedicalPackingPlasticBag = todayOutboundAuxiliaryMedicalPackingPlasticBag;
    }

    public float getTodayOutboundAuxiliaryCollectionBox() {
        return todayOutboundAuxiliaryCollectionBox;
    }

    public void setTodayOutboundAuxiliaryCollectionBox(float todayOutboundAuxiliaryCollectionBox) {
        this.todayOutboundAuxiliaryCollectionBox = todayOutboundAuxiliaryCollectionBox;
    }

    public float getTodayOutboundAuxiliaryStandardBox() {
        return todayOutboundAuxiliaryStandardBox;
    }

    public void setTodayOutboundAuxiliaryStandardBox(float todayOutboundAuxiliaryStandardBox) {
        this.todayOutboundAuxiliaryStandardBox = todayOutboundAuxiliaryStandardBox;
    }

    public float getTodayOutboundAuxiliaryWoodenPallets() {
        return todayOutboundAuxiliaryWoodenPallets;
    }

    public void setTodayOutboundAuxiliaryWoodenPallets(float todayOutboundAuxiliaryWoodenPallets) {
        this.todayOutboundAuxiliaryWoodenPallets = todayOutboundAuxiliaryWoodenPallets;
    }

    public float getTodayOutboundAuxiliaryStandardTray_1m() {
        return todayOutboundAuxiliaryStandardTray_1m;
    }

    public void setTodayOutboundAuxiliaryStandardTray_1m(float todayOutboundAuxiliaryStandardTray_1m) {
        this.todayOutboundAuxiliaryStandardTray_1m = todayOutboundAuxiliaryStandardTray_1m;
    }

    public float getTodayOutboundAuxiliaryStandardTray_1_2m() {
        return todayOutboundAuxiliaryStandardTray_1_2m;
    }

    public void setTodayOutboundAuxiliaryStandardTray_1_2m(float todayOutboundAuxiliaryStandardTray_1_2m) {
        this.todayOutboundAuxiliaryStandardTray_1_2m = todayOutboundAuxiliaryStandardTray_1_2m;
    }

    public float getTodayOutboundAuxiliaryTonBox() {
        return todayOutboundAuxiliaryTonBox;
    }

    public void setTodayOutboundAuxiliaryTonBox(float todayOutboundAuxiliaryTonBox) {
        this.todayOutboundAuxiliaryTonBox = todayOutboundAuxiliaryTonBox;
    }

    public float getTodayOutboundAuxiliarySteam() {
        return todayOutboundAuxiliarySteam;
    }

    public void setTodayOutboundAuxiliarySteam(float todayOutboundAuxiliarySteam) {
        this.todayOutboundAuxiliarySteam = todayOutboundAuxiliarySteam;
    }

    public float getTodayOutboundAuxiliaryDieselOil() {
        return todayOutboundAuxiliaryDieselOil;
    }

    public void setTodayOutboundAuxiliaryDieselOil(float todayOutboundAuxiliaryDieselOil) {
        this.todayOutboundAuxiliaryDieselOil = todayOutboundAuxiliaryDieselOil;
    }

    public float getTodayOutboundAuxiliaryNaturalGas() {
        return todayOutboundAuxiliaryNaturalGas;
    }

    public void setTodayOutboundAuxiliaryNaturalGas(float todayOutboundAuxiliaryNaturalGas) {
        this.todayOutboundAuxiliaryNaturalGas = todayOutboundAuxiliaryNaturalGas;
    }

    public float getTodayOutboundAuxiliaryElectricQuantity() {
        return todayOutboundAuxiliaryElectricQuantity;
    }

    public void setTodayOutboundAuxiliaryElectricQuantity(float todayOutboundAuxiliaryElectricQuantity) {
        this.todayOutboundAuxiliaryElectricQuantity = todayOutboundAuxiliaryElectricQuantity;
    }

    public float getTodayOutboundAuxiliaryIndustrialWater() {
        return todayOutboundAuxiliaryIndustrialWater;
    }

    public void setTodayOutboundAuxiliaryIndustrialWater(float todayOutboundAuxiliaryIndustrialWater) {
        this.todayOutboundAuxiliaryIndustrialWater = todayOutboundAuxiliaryIndustrialWater;
    }

    public float getTodayOutboundAuxiliaryTapWaterQuantity() {
        return todayOutboundAuxiliaryTapWaterQuantity;
    }

    public void setTodayOutboundAuxiliaryTapWaterQuantity(float todayOutboundAuxiliaryTapWaterQuantity) {
        this.todayOutboundAuxiliaryTapWaterQuantity = todayOutboundAuxiliaryTapWaterQuantity;
    }

    public float getMonthOutboundAuxiliaryCalcareousLime() {
        return monthOutboundAuxiliaryCalcareousLime;
    }

    public void setMonthOutboundAuxiliaryCalcareousLime(float monthOutboundAuxiliaryCalcareousLime) {
        this.monthOutboundAuxiliaryCalcareousLime = monthOutboundAuxiliaryCalcareousLime;
    }

    public float getMonthOutboundAuxiliaryCommonActivatedCarbon() {
        return monthOutboundAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthOutboundAuxiliaryCommonActivatedCarbon(float monthOutboundAuxiliaryCommonActivatedCarbon) {
        this.monthOutboundAuxiliaryCommonActivatedCarbon = monthOutboundAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthOutboundAuxiliaryActivatedCarbon() {
        return monthOutboundAuxiliaryActivatedCarbon;
    }

    public void setMonthOutboundAuxiliaryActivatedCarbon(float monthOutboundAuxiliaryActivatedCarbon) {
        this.monthOutboundAuxiliaryActivatedCarbon = monthOutboundAuxiliaryActivatedCarbon;
    }

    public float getMonthOutboundAuxiliaryActivatedCarbonParticles() {
        return monthOutboundAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthOutboundAuxiliaryActivatedCarbonParticles(float monthOutboundAuxiliaryActivatedCarbonParticles) {
        this.monthOutboundAuxiliaryActivatedCarbonParticles = monthOutboundAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthOutboundAuxiliaryLye() {
        return monthOutboundAuxiliaryLye;
    }

    public void setMonthOutboundAuxiliaryLye(float monthOutboundAuxiliaryLye) {
        this.monthOutboundAuxiliaryLye = monthOutboundAuxiliaryLye;
    }

    public float getMonthOutboundAuxiliaryCausticSoda() {
        return monthOutboundAuxiliaryCausticSoda;
    }

    public void setMonthOutboundAuxiliaryCausticSoda(float monthOutboundAuxiliaryCausticSoda) {
        this.monthOutboundAuxiliaryCausticSoda = monthOutboundAuxiliaryCausticSoda;
    }

    public float getMonthOutboundAuxiliaryUrea() {
        return monthOutboundAuxiliaryUrea;
    }

    public void setMonthOutboundAuxiliaryUrea(float monthOutboundAuxiliaryUrea) {
        this.monthOutboundAuxiliaryUrea = monthOutboundAuxiliaryUrea;
    }

    public float getMonthOutboundAuxiliaryHydrochloricAcid() {
        return monthOutboundAuxiliaryHydrochloricAcid;
    }

    public void setMonthOutboundAuxiliaryHydrochloricAcid(float monthOutboundAuxiliaryHydrochloricAcid) {
        this.monthOutboundAuxiliaryHydrochloricAcid = monthOutboundAuxiliaryHydrochloricAcid;
    }

    public float getMonthOutboundAuxiliaryNahco3() {
        return monthOutboundAuxiliaryNahco3;
    }

    public void setMonthOutboundAuxiliaryNahco3(float monthOutboundAuxiliaryNahco3) {
        this.monthOutboundAuxiliaryNahco3 = monthOutboundAuxiliaryNahco3;
    }

    public float getMonthOutboundAuxiliaryFlour() {
        return monthOutboundAuxiliaryFlour;
    }

    public void setMonthOutboundAuxiliaryFlour(float monthOutboundAuxiliaryFlour) {
        this.monthOutboundAuxiliaryFlour = monthOutboundAuxiliaryFlour;
    }

    public float getMonthOutboundAuxiliaryDefoamer() {
        return monthOutboundAuxiliaryDefoamer;
    }

    public void setMonthOutboundAuxiliaryDefoamer(float monthOutboundAuxiliaryDefoamer) {
        this.monthOutboundAuxiliaryDefoamer = monthOutboundAuxiliaryDefoamer;
    }

    public float getMonthOutboundAuxiliaryFlocculant() {
        return monthOutboundAuxiliaryFlocculant;
    }

    public void setMonthOutboundAuxiliaryFlocculant(float monthOutboundAuxiliaryFlocculant) {
        this.monthOutboundAuxiliaryFlocculant = monthOutboundAuxiliaryFlocculant;
    }

    public float getMonthOutboundAuxiliarySoftWaterReducingAgent() {
        return monthOutboundAuxiliarySoftWaterReducingAgent;
    }

    public void setMonthOutboundAuxiliarySoftWaterReducingAgent(float monthOutboundAuxiliarySoftWaterReducingAgent) {
        this.monthOutboundAuxiliarySoftWaterReducingAgent = monthOutboundAuxiliarySoftWaterReducingAgent;
    }

    public float getMonthOutboundAuxiliarySoftWaterScaleInhibitor() {
        return monthOutboundAuxiliarySoftWaterScaleInhibitor;
    }

    public void setMonthOutboundAuxiliarySoftWaterScaleInhibitor(float monthOutboundAuxiliarySoftWaterScaleInhibitor) {
        this.monthOutboundAuxiliarySoftWaterScaleInhibitor = monthOutboundAuxiliarySoftWaterScaleInhibitor;
    }

    public float getMonthOutboundAuxiliaryAmmonia() {
        return monthOutboundAuxiliaryAmmonia;
    }

    public void setMonthOutboundAuxiliaryAmmonia(float monthOutboundAuxiliaryAmmonia) {
        this.monthOutboundAuxiliaryAmmonia = monthOutboundAuxiliaryAmmonia;
    }

    public float getMonthOutboundAuxiliaryWaterReducingAgent() {
        return monthOutboundAuxiliaryWaterReducingAgent;
    }

    public void setMonthOutboundAuxiliaryWaterReducingAgent(float monthOutboundAuxiliaryWaterReducingAgent) {
        this.monthOutboundAuxiliaryWaterReducingAgent = monthOutboundAuxiliaryWaterReducingAgent;
    }

    public float getMonthOutboundAuxiliaryWaterScaleInhibitor() {
        return monthOutboundAuxiliaryWaterScaleInhibitor;
    }

    public void setMonthOutboundAuxiliaryWaterScaleInhibitor(float monthOutboundAuxiliaryWaterScaleInhibitor) {
        this.monthOutboundAuxiliaryWaterScaleInhibitor = monthOutboundAuxiliaryWaterScaleInhibitor;
    }

    public float getMonthOutboundAuxiliaryNaclo() {
        return monthOutboundAuxiliaryNaclo;
    }

    public void setMonthOutboundAuxiliaryNaclo(float monthOutboundAuxiliaryNaclo) {
        this.monthOutboundAuxiliaryNaclo = monthOutboundAuxiliaryNaclo;
    }

    public float getMonthOutboundAuxiliaryDeodorant() {
        return monthOutboundAuxiliaryDeodorant;
    }

    public void setMonthOutboundAuxiliaryDeodorant(float monthOutboundAuxiliaryDeodorant) {
        this.monthOutboundAuxiliaryDeodorant = monthOutboundAuxiliaryDeodorant;
    }

    public float getMonthOutboundAuxiliarySalt() {
        return monthOutboundAuxiliarySalt;
    }

    public void setMonthOutboundAuxiliarySalt(float monthOutboundAuxiliarySalt) {
        this.monthOutboundAuxiliarySalt = monthOutboundAuxiliarySalt;
    }

    public float getMonthOutboundAuxiliarySlagBag() {
        return monthOutboundAuxiliarySlagBag;
    }

    public void setMonthOutboundAuxiliarySlagBag(float monthOutboundAuxiliarySlagBag) {
        this.monthOutboundAuxiliarySlagBag = monthOutboundAuxiliarySlagBag;
    }

    public float getMonthOutboundAuxiliaryFlyAshBag() {
        return monthOutboundAuxiliaryFlyAshBag;
    }

    public void setMonthOutboundAuxiliaryFlyAshBag(float monthOutboundAuxiliaryFlyAshBag) {
        this.monthOutboundAuxiliaryFlyAshBag = monthOutboundAuxiliaryFlyAshBag;
    }

    public float getMonthOutboundAuxiliaryMedicalWastesBag() {
        return monthOutboundAuxiliaryMedicalWastesBag;
    }

    public void setMonthOutboundAuxiliaryMedicalWastesBag(float monthOutboundAuxiliaryMedicalWastesBag) {
        this.monthOutboundAuxiliaryMedicalWastesBag = monthOutboundAuxiliaryMedicalWastesBag;
    }

    public float getMonthOutboundAuxiliaryMedicalPackingPlasticBag() {
        return monthOutboundAuxiliaryMedicalPackingPlasticBag;
    }

    public void setMonthOutboundAuxiliaryMedicalPackingPlasticBag(float monthOutboundAuxiliaryMedicalPackingPlasticBag) {
        this.monthOutboundAuxiliaryMedicalPackingPlasticBag = monthOutboundAuxiliaryMedicalPackingPlasticBag;
    }

    public float getMonthOutboundAuxiliaryCollectionBox() {
        return monthOutboundAuxiliaryCollectionBox;
    }

    public void setMonthOutboundAuxiliaryCollectionBox(float monthOutboundAuxiliaryCollectionBox) {
        this.monthOutboundAuxiliaryCollectionBox = monthOutboundAuxiliaryCollectionBox;
    }

    public float getMonthOutboundAuxiliaryStandardBox() {
        return monthOutboundAuxiliaryStandardBox;
    }

    public void setMonthOutboundAuxiliaryStandardBox(float monthOutboundAuxiliaryStandardBox) {
        this.monthOutboundAuxiliaryStandardBox = monthOutboundAuxiliaryStandardBox;
    }

    public float getMonthOutboundAuxiliaryWoodenPallets() {
        return monthOutboundAuxiliaryWoodenPallets;
    }

    public void setMonthOutboundAuxiliaryWoodenPallets(float monthOutboundAuxiliaryWoodenPallets) {
        this.monthOutboundAuxiliaryWoodenPallets = monthOutboundAuxiliaryWoodenPallets;
    }

    public float getMonthOutboundAuxiliaryStandardTray_1m() {
        return monthOutboundAuxiliaryStandardTray_1m;
    }

    public void setMonthOutboundAuxiliaryStandardTray_1m(float monthOutboundAuxiliaryStandardTray_1m) {
        this.monthOutboundAuxiliaryStandardTray_1m = monthOutboundAuxiliaryStandardTray_1m;
    }

    public float getMonthOutboundAuxiliaryStandardTray_1_2m() {
        return monthOutboundAuxiliaryStandardTray_1_2m;
    }

    public void setMonthOutboundAuxiliaryStandardTray_1_2m(float monthOutboundAuxiliaryStandardTray_1_2m) {
        this.monthOutboundAuxiliaryStandardTray_1_2m = monthOutboundAuxiliaryStandardTray_1_2m;
    }

    public float getMonthOutboundAuxiliaryTonBox() {
        return monthOutboundAuxiliaryTonBox;
    }

    public void setMonthOutboundAuxiliaryTonBox(float monthOutboundAuxiliaryTonBox) {
        this.monthOutboundAuxiliaryTonBox = monthOutboundAuxiliaryTonBox;
    }

    public float getMonthOutboundAuxiliarySteam() {
        return monthOutboundAuxiliarySteam;
    }

    public void setMonthOutboundAuxiliarySteam(float monthOutboundAuxiliarySteam) {
        this.monthOutboundAuxiliarySteam = monthOutboundAuxiliarySteam;
    }

    public float getMonthOutboundAuxiliaryDieselOil() {
        return monthOutboundAuxiliaryDieselOil;
    }

    public void setMonthOutboundAuxiliaryDieselOil(float monthOutboundAuxiliaryDieselOil) {
        this.monthOutboundAuxiliaryDieselOil = monthOutboundAuxiliaryDieselOil;
    }

    public float getMonthOutboundAuxiliaryNaturalGas() {
        return monthOutboundAuxiliaryNaturalGas;
    }

    public void setMonthOutboundAuxiliaryNaturalGas(float monthOutboundAuxiliaryNaturalGas) {
        this.monthOutboundAuxiliaryNaturalGas = monthOutboundAuxiliaryNaturalGas;
    }

    public float getMonthOutboundAuxiliaryElectricQuantity() {
        return monthOutboundAuxiliaryElectricQuantity;
    }

    public void setMonthOutboundAuxiliaryElectricQuantity(float monthOutboundAuxiliaryElectricQuantity) {
        this.monthOutboundAuxiliaryElectricQuantity = monthOutboundAuxiliaryElectricQuantity;
    }

    public float getMonthOutboundAuxiliaryIndustrialWater() {
        return monthOutboundAuxiliaryIndustrialWater;
    }

    public void setMonthOutboundAuxiliaryIndustrialWater(float monthOutboundAuxiliaryIndustrialWater) {
        this.monthOutboundAuxiliaryIndustrialWater = monthOutboundAuxiliaryIndustrialWater;
    }

    public float getMonthOutboundAuxiliaryTapWaterQuantity() {
        return monthOutboundAuxiliaryTapWaterQuantity;
    }

    public void setMonthOutboundAuxiliaryTapWaterQuantity(float monthOutboundAuxiliaryTapWaterQuantity) {
        this.monthOutboundAuxiliaryTapWaterQuantity = monthOutboundAuxiliaryTapWaterQuantity;
    }

    public float getYearOutboundAuxiliaryCalcareousLime() {
        return yearOutboundAuxiliaryCalcareousLime;
    }

    public void setYearOutboundAuxiliaryCalcareousLime(float yearOutboundAuxiliaryCalcareousLime) {
        this.yearOutboundAuxiliaryCalcareousLime = yearOutboundAuxiliaryCalcareousLime;
    }

    public float getYearOutboundAuxiliaryCommonActivatedCarbon() {
        return yearOutboundAuxiliaryCommonActivatedCarbon;
    }

    public void setYearOutboundAuxiliaryCommonActivatedCarbon(float yearOutboundAuxiliaryCommonActivatedCarbon) {
        this.yearOutboundAuxiliaryCommonActivatedCarbon = yearOutboundAuxiliaryCommonActivatedCarbon;
    }

    public float getYearOutboundAuxiliaryActivatedCarbon() {
        return yearOutboundAuxiliaryActivatedCarbon;
    }

    public void setYearOutboundAuxiliaryActivatedCarbon(float yearOutboundAuxiliaryActivatedCarbon) {
        this.yearOutboundAuxiliaryActivatedCarbon = yearOutboundAuxiliaryActivatedCarbon;
    }

    public float getYearOutboundAuxiliaryActivatedCarbonParticles() {
        return yearOutboundAuxiliaryActivatedCarbonParticles;
    }

    public void setYearOutboundAuxiliaryActivatedCarbonParticles(float yearOutboundAuxiliaryActivatedCarbonParticles) {
        this.yearOutboundAuxiliaryActivatedCarbonParticles = yearOutboundAuxiliaryActivatedCarbonParticles;
    }

    public float getYearOutboundAuxiliaryLye() {
        return yearOutboundAuxiliaryLye;
    }

    public void setYearOutboundAuxiliaryLye(float yearOutboundAuxiliaryLye) {
        this.yearOutboundAuxiliaryLye = yearOutboundAuxiliaryLye;
    }

    public float getYearOutboundAuxiliaryCausticSoda() {
        return yearOutboundAuxiliaryCausticSoda;
    }

    public void setYearOutboundAuxiliaryCausticSoda(float yearOutboundAuxiliaryCausticSoda) {
        this.yearOutboundAuxiliaryCausticSoda = yearOutboundAuxiliaryCausticSoda;
    }

    public float getYearOutboundAuxiliaryUrea() {
        return yearOutboundAuxiliaryUrea;
    }

    public void setYearOutboundAuxiliaryUrea(float yearOutboundAuxiliaryUrea) {
        this.yearOutboundAuxiliaryUrea = yearOutboundAuxiliaryUrea;
    }

    public float getYearOutboundAuxiliaryHydrochloricAcid() {
        return yearOutboundAuxiliaryHydrochloricAcid;
    }

    public void setYearOutboundAuxiliaryHydrochloricAcid(float yearOutboundAuxiliaryHydrochloricAcid) {
        this.yearOutboundAuxiliaryHydrochloricAcid = yearOutboundAuxiliaryHydrochloricAcid;
    }

    public float getYearOutboundAuxiliaryNahco3() {
        return yearOutboundAuxiliaryNahco3;
    }

    public void setYearOutboundAuxiliaryNahco3(float yearOutboundAuxiliaryNahco3) {
        this.yearOutboundAuxiliaryNahco3 = yearOutboundAuxiliaryNahco3;
    }

    public float getYearOutboundAuxiliaryFlour() {
        return yearOutboundAuxiliaryFlour;
    }

    public void setYearOutboundAuxiliaryFlour(float yearOutboundAuxiliaryFlour) {
        this.yearOutboundAuxiliaryFlour = yearOutboundAuxiliaryFlour;
    }

    public float getYearOutboundAuxiliaryDefoamer() {
        return yearOutboundAuxiliaryDefoamer;
    }

    public void setYearOutboundAuxiliaryDefoamer(float yearOutboundAuxiliaryDefoamer) {
        this.yearOutboundAuxiliaryDefoamer = yearOutboundAuxiliaryDefoamer;
    }

    public float getYearOutboundAuxiliaryFlocculant() {
        return yearOutboundAuxiliaryFlocculant;
    }

    public void setYearOutboundAuxiliaryFlocculant(float yearOutboundAuxiliaryFlocculant) {
        this.yearOutboundAuxiliaryFlocculant = yearOutboundAuxiliaryFlocculant;
    }

    public float getYearOutboundAuxiliarySoftWaterReducingAgent() {
        return yearOutboundAuxiliarySoftWaterReducingAgent;
    }

    public void setYearOutboundAuxiliarySoftWaterReducingAgent(float yearOutboundAuxiliarySoftWaterReducingAgent) {
        this.yearOutboundAuxiliarySoftWaterReducingAgent = yearOutboundAuxiliarySoftWaterReducingAgent;
    }

    public float getYearOutboundAuxiliarySoftWaterScaleInhibitor() {
        return yearOutboundAuxiliarySoftWaterScaleInhibitor;
    }

    public void setYearOutboundAuxiliarySoftWaterScaleInhibitor(float yearOutboundAuxiliarySoftWaterScaleInhibitor) {
        this.yearOutboundAuxiliarySoftWaterScaleInhibitor = yearOutboundAuxiliarySoftWaterScaleInhibitor;
    }

    public float getYearOutboundAuxiliaryAmmonia() {
        return yearOutboundAuxiliaryAmmonia;
    }

    public void setYearOutboundAuxiliaryAmmonia(float yearOutboundAuxiliaryAmmonia) {
        this.yearOutboundAuxiliaryAmmonia = yearOutboundAuxiliaryAmmonia;
    }

    public float getYearOutboundAuxiliaryWaterReducingAgent() {
        return yearOutboundAuxiliaryWaterReducingAgent;
    }

    public void setYearOutboundAuxiliaryWaterReducingAgent(float yearOutboundAuxiliaryWaterReducingAgent) {
        this.yearOutboundAuxiliaryWaterReducingAgent = yearOutboundAuxiliaryWaterReducingAgent;
    }

    public float getYearOutboundAuxiliaryWaterScaleInhibitor() {
        return yearOutboundAuxiliaryWaterScaleInhibitor;
    }

    public void setYearOutboundAuxiliaryWaterScaleInhibitor(float yearOutboundAuxiliaryWaterScaleInhibitor) {
        this.yearOutboundAuxiliaryWaterScaleInhibitor = yearOutboundAuxiliaryWaterScaleInhibitor;
    }

    public float getYearOutboundAuxiliaryNaclo() {
        return yearOutboundAuxiliaryNaclo;
    }

    public void setYearOutboundAuxiliaryNaclo(float yearOutboundAuxiliaryNaclo) {
        this.yearOutboundAuxiliaryNaclo = yearOutboundAuxiliaryNaclo;
    }

    public float getYearOutboundAuxiliaryDeodorant() {
        return yearOutboundAuxiliaryDeodorant;
    }

    public void setYearOutboundAuxiliaryDeodorant(float yearOutboundAuxiliaryDeodorant) {
        this.yearOutboundAuxiliaryDeodorant = yearOutboundAuxiliaryDeodorant;
    }

    public float getYearOutboundAuxiliarySalt() {
        return yearOutboundAuxiliarySalt;
    }

    public void setYearOutboundAuxiliarySalt(float yearOutboundAuxiliarySalt) {
        this.yearOutboundAuxiliarySalt = yearOutboundAuxiliarySalt;
    }

    public float getYearOutboundAuxiliarySlagBag() {
        return yearOutboundAuxiliarySlagBag;
    }

    public void setYearOutboundAuxiliarySlagBag(float yearOutboundAuxiliarySlagBag) {
        this.yearOutboundAuxiliarySlagBag = yearOutboundAuxiliarySlagBag;
    }

    public float getYearOutboundAuxiliaryFlyAshBag() {
        return yearOutboundAuxiliaryFlyAshBag;
    }

    public void setYearOutboundAuxiliaryFlyAshBag(float yearOutboundAuxiliaryFlyAshBag) {
        this.yearOutboundAuxiliaryFlyAshBag = yearOutboundAuxiliaryFlyAshBag;
    }

    public float getYearOutboundAuxiliaryMedicalWastesBag() {
        return yearOutboundAuxiliaryMedicalWastesBag;
    }

    public void setYearOutboundAuxiliaryMedicalWastesBag(float yearOutboundAuxiliaryMedicalWastesBag) {
        this.yearOutboundAuxiliaryMedicalWastesBag = yearOutboundAuxiliaryMedicalWastesBag;
    }

    public float getYearOutboundAuxiliaryMedicalPackingPlasticBag() {
        return yearOutboundAuxiliaryMedicalPackingPlasticBag;
    }

    public void setYearOutboundAuxiliaryMedicalPackingPlasticBag(float yearOutboundAuxiliaryMedicalPackingPlasticBag) {
        this.yearOutboundAuxiliaryMedicalPackingPlasticBag = yearOutboundAuxiliaryMedicalPackingPlasticBag;
    }

    public float getYearOutboundAuxiliaryCollectionBox() {
        return yearOutboundAuxiliaryCollectionBox;
    }

    public void setYearOutboundAuxiliaryCollectionBox(float yearOutboundAuxiliaryCollectionBox) {
        this.yearOutboundAuxiliaryCollectionBox = yearOutboundAuxiliaryCollectionBox;
    }

    public float getYearOutboundAuxiliaryStandardBox() {
        return yearOutboundAuxiliaryStandardBox;
    }

    public void setYearOutboundAuxiliaryStandardBox(float yearOutboundAuxiliaryStandardBox) {
        this.yearOutboundAuxiliaryStandardBox = yearOutboundAuxiliaryStandardBox;
    }

    public float getYearOutboundAuxiliaryWoodenPallets() {
        return yearOutboundAuxiliaryWoodenPallets;
    }

    public void setYearOutboundAuxiliaryWoodenPallets(float yearOutboundAuxiliaryWoodenPallets) {
        this.yearOutboundAuxiliaryWoodenPallets = yearOutboundAuxiliaryWoodenPallets;
    }

    public float getYearOutboundAuxiliaryStandardTray_1m() {
        return yearOutboundAuxiliaryStandardTray_1m;
    }

    public void setYearOutboundAuxiliaryStandardTray_1m(float yearOutboundAuxiliaryStandardTray_1m) {
        this.yearOutboundAuxiliaryStandardTray_1m = yearOutboundAuxiliaryStandardTray_1m;
    }

    public float getYearOutboundAuxiliaryStandardTray_1_2m() {
        return yearOutboundAuxiliaryStandardTray_1_2m;
    }

    public void setYearOutboundAuxiliaryStandardTray_1_2m(float yearOutboundAuxiliaryStandardTray_1_2m) {
        this.yearOutboundAuxiliaryStandardTray_1_2m = yearOutboundAuxiliaryStandardTray_1_2m;
    }

    public float getYearOutboundAuxiliaryTonBox() {
        return yearOutboundAuxiliaryTonBox;
    }

    public void setYearOutboundAuxiliaryTonBox(float yearOutboundAuxiliaryTonBox) {
        this.yearOutboundAuxiliaryTonBox = yearOutboundAuxiliaryTonBox;
    }

    public float getYearOutboundAuxiliarySteam() {
        return yearOutboundAuxiliarySteam;
    }

    public void setYearOutboundAuxiliarySteam(float yearOutboundAuxiliarySteam) {
        this.yearOutboundAuxiliarySteam = yearOutboundAuxiliarySteam;
    }

    public float getYearOutboundAuxiliaryDieselOil() {
        return yearOutboundAuxiliaryDieselOil;
    }

    public void setYearOutboundAuxiliaryDieselOil(float yearOutboundAuxiliaryDieselOil) {
        this.yearOutboundAuxiliaryDieselOil = yearOutboundAuxiliaryDieselOil;
    }

    public float getYearOutboundAuxiliaryNaturalGas() {
        return yearOutboundAuxiliaryNaturalGas;
    }

    public void setYearOutboundAuxiliaryNaturalGas(float yearOutboundAuxiliaryNaturalGas) {
        this.yearOutboundAuxiliaryNaturalGas = yearOutboundAuxiliaryNaturalGas;
    }

    public float getYearOutboundAuxiliaryElectricQuantity() {
        return yearOutboundAuxiliaryElectricQuantity;
    }

    public void setYearOutboundAuxiliaryElectricQuantity(float yearOutboundAuxiliaryElectricQuantity) {
        this.yearOutboundAuxiliaryElectricQuantity = yearOutboundAuxiliaryElectricQuantity;
    }

    public float getYearOutboundAuxiliaryIndustrialWater() {
        return yearOutboundAuxiliaryIndustrialWater;
    }

    public void setYearOutboundAuxiliaryIndustrialWater(float yearOutboundAuxiliaryIndustrialWater) {
        this.yearOutboundAuxiliaryIndustrialWater = yearOutboundAuxiliaryIndustrialWater;
    }

    public float getYearOutboundAuxiliaryTapWaterQuantity() {
        return yearOutboundAuxiliaryTapWaterQuantity;
    }

    public void setYearOutboundAuxiliaryTapWaterQuantity(float yearOutboundAuxiliaryTapWaterQuantity) {
        this.yearOutboundAuxiliaryTapWaterQuantity = yearOutboundAuxiliaryTapWaterQuantity;
    }

    public float getMonthBalanceAuxiliaryCalcareousLime() {
        return monthBalanceAuxiliaryCalcareousLime;
    }

    public void setMonthBalanceAuxiliaryCalcareousLime(float monthBalanceAuxiliaryCalcareousLime) {
        this.monthBalanceAuxiliaryCalcareousLime = monthBalanceAuxiliaryCalcareousLime;
    }

    public float getMonthBalanceAuxiliaryCommonActivatedCarbon() {
        return monthBalanceAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthBalanceAuxiliaryCommonActivatedCarbon(float monthBalanceAuxiliaryCommonActivatedCarbon) {
        this.monthBalanceAuxiliaryCommonActivatedCarbon = monthBalanceAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthBalanceAuxiliaryActivatedCarbon() {
        return monthBalanceAuxiliaryActivatedCarbon;
    }

    public void setMonthBalanceAuxiliaryActivatedCarbon(float monthBalanceAuxiliaryActivatedCarbon) {
        this.monthBalanceAuxiliaryActivatedCarbon = monthBalanceAuxiliaryActivatedCarbon;
    }

    public float getMonthBalanceAuxiliaryActivatedCarbonParticles() {
        return monthBalanceAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthBalanceAuxiliaryActivatedCarbonParticles(float monthBalanceAuxiliaryActivatedCarbonParticles) {
        this.monthBalanceAuxiliaryActivatedCarbonParticles = monthBalanceAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthBalanceAuxiliaryLye() {
        return monthBalanceAuxiliaryLye;
    }

    public void setMonthBalanceAuxiliaryLye(float monthBalanceAuxiliaryLye) {
        this.monthBalanceAuxiliaryLye = monthBalanceAuxiliaryLye;
    }

    public float getMonthBalanceAuxiliaryCausticSoda() {
        return monthBalanceAuxiliaryCausticSoda;
    }

    public void setMonthBalanceAuxiliaryCausticSoda(float monthBalanceAuxiliaryCausticSoda) {
        this.monthBalanceAuxiliaryCausticSoda = monthBalanceAuxiliaryCausticSoda;
    }

    public float getMonthBalanceAuxiliaryUrea() {
        return monthBalanceAuxiliaryUrea;
    }

    public void setMonthBalanceAuxiliaryUrea(float monthBalanceAuxiliaryUrea) {
        this.monthBalanceAuxiliaryUrea = monthBalanceAuxiliaryUrea;
    }

    public float getMonthBalanceAuxiliaryHydrochloricAcid() {
        return monthBalanceAuxiliaryHydrochloricAcid;
    }

    public void setMonthBalanceAuxiliaryHydrochloricAcid(float monthBalanceAuxiliaryHydrochloricAcid) {
        this.monthBalanceAuxiliaryHydrochloricAcid = monthBalanceAuxiliaryHydrochloricAcid;
    }

    public float getMonthBalanceAuxiliaryNahco3() {
        return monthBalanceAuxiliaryNahco3;
    }

    public void setMonthBalanceAuxiliaryNahco3(float monthBalanceAuxiliaryNahco3) {
        this.monthBalanceAuxiliaryNahco3 = monthBalanceAuxiliaryNahco3;
    }

    public float getMonthBalanceAuxiliaryFlour() {
        return monthBalanceAuxiliaryFlour;
    }

    public void setMonthBalanceAuxiliaryFlour(float monthBalanceAuxiliaryFlour) {
        this.monthBalanceAuxiliaryFlour = monthBalanceAuxiliaryFlour;
    }

    public float getMonthBalanceAuxiliaryDefoamer() {
        return monthBalanceAuxiliaryDefoamer;
    }

    public void setMonthBalanceAuxiliaryDefoamer(float monthBalanceAuxiliaryDefoamer) {
        this.monthBalanceAuxiliaryDefoamer = monthBalanceAuxiliaryDefoamer;
    }

    public float getMonthBalanceAuxiliaryFlocculant() {
        return monthBalanceAuxiliaryFlocculant;
    }

    public void setMonthBalanceAuxiliaryFlocculant(float monthBalanceAuxiliaryFlocculant) {
        this.monthBalanceAuxiliaryFlocculant = monthBalanceAuxiliaryFlocculant;
    }

    public float getMonthBalanceAuxiliarySoftWaterReducingAgent() {
        return monthBalanceAuxiliarySoftWaterReducingAgent;
    }

    public void setMonthBalanceAuxiliarySoftWaterReducingAgent(float monthBalanceAuxiliarySoftWaterReducingAgent) {
        this.monthBalanceAuxiliarySoftWaterReducingAgent = monthBalanceAuxiliarySoftWaterReducingAgent;
    }

    public float getMonthBalanceAuxiliarySoftWaterScaleInhibitor() {
        return monthBalanceAuxiliarySoftWaterScaleInhibitor;
    }

    public void setMonthBalanceAuxiliarySoftWaterScaleInhibitor(float monthBalanceAuxiliarySoftWaterScaleInhibitor) {
        this.monthBalanceAuxiliarySoftWaterScaleInhibitor = monthBalanceAuxiliarySoftWaterScaleInhibitor;
    }

    public float getMonthBalanceAuxiliaryAmmonia() {
        return monthBalanceAuxiliaryAmmonia;
    }

    public void setMonthBalanceAuxiliaryAmmonia(float monthBalanceAuxiliaryAmmonia) {
        this.monthBalanceAuxiliaryAmmonia = monthBalanceAuxiliaryAmmonia;
    }

    public float getMonthBalanceAuxiliaryWaterReducingAgent() {
        return monthBalanceAuxiliaryWaterReducingAgent;
    }

    public void setMonthBalanceAuxiliaryWaterReducingAgent(float monthBalanceAuxiliaryWaterReducingAgent) {
        this.monthBalanceAuxiliaryWaterReducingAgent = monthBalanceAuxiliaryWaterReducingAgent;
    }

    public float getMonthBalanceAuxiliaryWaterScaleInhibitor() {
        return monthBalanceAuxiliaryWaterScaleInhibitor;
    }

    public void setMonthBalanceAuxiliaryWaterScaleInhibitor(float monthBalanceAuxiliaryWaterScaleInhibitor) {
        this.monthBalanceAuxiliaryWaterScaleInhibitor = monthBalanceAuxiliaryWaterScaleInhibitor;
    }

    public float getMonthBalanceAuxiliaryNaclo() {
        return monthBalanceAuxiliaryNaclo;
    }

    public void setMonthBalanceAuxiliaryNaclo(float monthBalanceAuxiliaryNaclo) {
        this.monthBalanceAuxiliaryNaclo = monthBalanceAuxiliaryNaclo;
    }

    public float getMonthBalanceAuxiliaryDeodorant() {
        return monthBalanceAuxiliaryDeodorant;
    }

    public void setMonthBalanceAuxiliaryDeodorant(float monthBalanceAuxiliaryDeodorant) {
        this.monthBalanceAuxiliaryDeodorant = monthBalanceAuxiliaryDeodorant;
    }

    public float getMonthBalanceAuxiliarySalt() {
        return monthBalanceAuxiliarySalt;
    }

    public void setMonthBalanceAuxiliarySalt(float monthBalanceAuxiliarySalt) {
        this.monthBalanceAuxiliarySalt = monthBalanceAuxiliarySalt;
    }

    public float getMonthBalanceAuxiliarySlagBag() {
        return monthBalanceAuxiliarySlagBag;
    }

    public void setMonthBalanceAuxiliarySlagBag(float monthBalanceAuxiliarySlagBag) {
        this.monthBalanceAuxiliarySlagBag = monthBalanceAuxiliarySlagBag;
    }

    public float getMonthBalanceAuxiliaryFlyAshBag() {
        return monthBalanceAuxiliaryFlyAshBag;
    }

    public void setMonthBalanceAuxiliaryFlyAshBag(float monthBalanceAuxiliaryFlyAshBag) {
        this.monthBalanceAuxiliaryFlyAshBag = monthBalanceAuxiliaryFlyAshBag;
    }

    public float getMonthBalanceAuxiliaryMedicalWastesBag() {
        return monthBalanceAuxiliaryMedicalWastesBag;
    }

    public void setMonthBalanceAuxiliaryMedicalWastesBag(float monthBalanceAuxiliaryMedicalWastesBag) {
        this.monthBalanceAuxiliaryMedicalWastesBag = monthBalanceAuxiliaryMedicalWastesBag;
    }

    public float getMonthBalanceAuxiliaryMedicalPackingPlasticBag() {
        return monthBalanceAuxiliaryMedicalPackingPlasticBag;
    }

    public void setMonthBalanceAuxiliaryMedicalPackingPlasticBag(float monthBalanceAuxiliaryMedicalPackingPlasticBag) {
        this.monthBalanceAuxiliaryMedicalPackingPlasticBag = monthBalanceAuxiliaryMedicalPackingPlasticBag;
    }

    public float getMonthBalanceAuxiliaryCollectionBox() {
        return monthBalanceAuxiliaryCollectionBox;
    }

    public void setMonthBalanceAuxiliaryCollectionBox(float monthBalanceAuxiliaryCollectionBox) {
        this.monthBalanceAuxiliaryCollectionBox = monthBalanceAuxiliaryCollectionBox;
    }

    public float getMonthBalanceAuxiliaryStandardBox() {
        return monthBalanceAuxiliaryStandardBox;
    }

    public void setMonthBalanceAuxiliaryStandardBox(float monthBalanceAuxiliaryStandardBox) {
        this.monthBalanceAuxiliaryStandardBox = monthBalanceAuxiliaryStandardBox;
    }

    public float getMonthBalanceAuxiliaryWoodenPallets() {
        return monthBalanceAuxiliaryWoodenPallets;
    }

    public void setMonthBalanceAuxiliaryWoodenPallets(float monthBalanceAuxiliaryWoodenPallets) {
        this.monthBalanceAuxiliaryWoodenPallets = monthBalanceAuxiliaryWoodenPallets;
    }

    public float getMonthBalanceAuxiliaryStandardTray_1m() {
        return monthBalanceAuxiliaryStandardTray_1m;
    }

    public void setMonthBalanceAuxiliaryStandardTray_1m(float monthBalanceAuxiliaryStandardTray_1m) {
        this.monthBalanceAuxiliaryStandardTray_1m = monthBalanceAuxiliaryStandardTray_1m;
    }

    public float getMonthBalanceAuxiliaryStandardTray_1_2m() {
        return monthBalanceAuxiliaryStandardTray_1_2m;
    }

    public void setMonthBalanceAuxiliaryStandardTray_1_2m(float monthBalanceAuxiliaryStandardTray_1_2m) {
        this.monthBalanceAuxiliaryStandardTray_1_2m = monthBalanceAuxiliaryStandardTray_1_2m;
    }

    public float getMonthBalanceAuxiliaryTonBox() {
        return monthBalanceAuxiliaryTonBox;
    }

    public void setMonthBalanceAuxiliaryTonBox(float monthBalanceAuxiliaryTonBox) {
        this.monthBalanceAuxiliaryTonBox = monthBalanceAuxiliaryTonBox;
    }

    public float getMonthBalanceAuxiliarySteam() {
        return monthBalanceAuxiliarySteam;
    }

    public void setMonthBalanceAuxiliarySteam(float monthBalanceAuxiliarySteam) {
        this.monthBalanceAuxiliarySteam = monthBalanceAuxiliarySteam;
    }

    public float getMonthBalanceAuxiliaryDieselOil() {
        return monthBalanceAuxiliaryDieselOil;
    }

    public void setMonthBalanceAuxiliaryDieselOil(float monthBalanceAuxiliaryDieselOil) {
        this.monthBalanceAuxiliaryDieselOil = monthBalanceAuxiliaryDieselOil;
    }

    public float getMonthBalanceAuxiliaryNaturalGas() {
        return monthBalanceAuxiliaryNaturalGas;
    }

    public void setMonthBalanceAuxiliaryNaturalGas(float monthBalanceAuxiliaryNaturalGas) {
        this.monthBalanceAuxiliaryNaturalGas = monthBalanceAuxiliaryNaturalGas;
    }

    public float getMonthBalanceAuxiliaryElectricQuantity() {
        return monthBalanceAuxiliaryElectricQuantity;
    }

    public void setMonthBalanceAuxiliaryElectricQuantity(float monthBalanceAuxiliaryElectricQuantity) {
        this.monthBalanceAuxiliaryElectricQuantity = monthBalanceAuxiliaryElectricQuantity;
    }

    public float getMonthBalanceAuxiliaryIndustrialWater() {
        return monthBalanceAuxiliaryIndustrialWater;
    }

    public void setMonthBalanceAuxiliaryIndustrialWater(float monthBalanceAuxiliaryIndustrialWater) {
        this.monthBalanceAuxiliaryIndustrialWater = monthBalanceAuxiliaryIndustrialWater;
    }

    public float getMonthBalanceAuxiliaryTapWaterQuantity() {
        return monthBalanceAuxiliaryTapWaterQuantity;
    }

    public void setMonthBalanceAuxiliaryTapWaterQuantity(float monthBalanceAuxiliaryTapWaterQuantity) {
        this.monthBalanceAuxiliaryTapWaterQuantity = monthBalanceAuxiliaryTapWaterQuantity;
    }

    public float getTodayInventoryAuxiliaryCalcareousLime() {
        return todayInventoryAuxiliaryCalcareousLime;
    }

    public void setTodayInventoryAuxiliaryCalcareousLime(float todayInventoryAuxiliaryCalcareousLime) {
        this.todayInventoryAuxiliaryCalcareousLime = todayInventoryAuxiliaryCalcareousLime;
    }

    public float getTodayInventoryAuxiliaryCommonActivatedCarbon() {
        return todayInventoryAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayInventoryAuxiliaryCommonActivatedCarbon(float todayInventoryAuxiliaryCommonActivatedCarbon) {
        this.todayInventoryAuxiliaryCommonActivatedCarbon = todayInventoryAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayInventoryAuxiliaryActivatedCarbon() {
        return todayInventoryAuxiliaryActivatedCarbon;
    }

    public void setTodayInventoryAuxiliaryActivatedCarbon(float todayInventoryAuxiliaryActivatedCarbon) {
        this.todayInventoryAuxiliaryActivatedCarbon = todayInventoryAuxiliaryActivatedCarbon;
    }

    public float getTodayInventoryAuxiliaryActivatedCarbonParticles() {
        return todayInventoryAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayInventoryAuxiliaryActivatedCarbonParticles(float todayInventoryAuxiliaryActivatedCarbonParticles) {
        this.todayInventoryAuxiliaryActivatedCarbonParticles = todayInventoryAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayInventoryAuxiliaryLye() {
        return todayInventoryAuxiliaryLye;
    }

    public void setTodayInventoryAuxiliaryLye(float todayInventoryAuxiliaryLye) {
        this.todayInventoryAuxiliaryLye = todayInventoryAuxiliaryLye;
    }

    public float getTodayInventoryAuxiliaryCausticSoda() {
        return todayInventoryAuxiliaryCausticSoda;
    }

    public void setTodayInventoryAuxiliaryCausticSoda(float todayInventoryAuxiliaryCausticSoda) {
        this.todayInventoryAuxiliaryCausticSoda = todayInventoryAuxiliaryCausticSoda;
    }

    public float getTodayInventoryAuxiliaryUrea() {
        return todayInventoryAuxiliaryUrea;
    }

    public void setTodayInventoryAuxiliaryUrea(float todayInventoryAuxiliaryUrea) {
        this.todayInventoryAuxiliaryUrea = todayInventoryAuxiliaryUrea;
    }

    public float getTodayInventoryAuxiliaryHydrochloricAcid() {
        return todayInventoryAuxiliaryHydrochloricAcid;
    }

    public void setTodayInventoryAuxiliaryHydrochloricAcid(float todayInventoryAuxiliaryHydrochloricAcid) {
        this.todayInventoryAuxiliaryHydrochloricAcid = todayInventoryAuxiliaryHydrochloricAcid;
    }

    public float getTodayInventoryAuxiliaryNahco3() {
        return todayInventoryAuxiliaryNahco3;
    }

    public void setTodayInventoryAuxiliaryNahco3(float todayInventoryAuxiliaryNahco3) {
        this.todayInventoryAuxiliaryNahco3 = todayInventoryAuxiliaryNahco3;
    }

    public float getTodayInventoryAuxiliaryFlour() {
        return todayInventoryAuxiliaryFlour;
    }

    public void setTodayInventoryAuxiliaryFlour(float todayInventoryAuxiliaryFlour) {
        this.todayInventoryAuxiliaryFlour = todayInventoryAuxiliaryFlour;
    }

    public float getTodayInventoryAuxiliaryDefoamer() {
        return todayInventoryAuxiliaryDefoamer;
    }

    public void setTodayInventoryAuxiliaryDefoamer(float todayInventoryAuxiliaryDefoamer) {
        this.todayInventoryAuxiliaryDefoamer = todayInventoryAuxiliaryDefoamer;
    }

    public float getTodayInventoryAuxiliaryFlocculant() {
        return todayInventoryAuxiliaryFlocculant;
    }

    public void setTodayInventoryAuxiliaryFlocculant(float todayInventoryAuxiliaryFlocculant) {
        this.todayInventoryAuxiliaryFlocculant = todayInventoryAuxiliaryFlocculant;
    }

    public float getTodayInventoryAuxiliarySoftWaterReducingAgent() {
        return todayInventoryAuxiliarySoftWaterReducingAgent;
    }

    public void setTodayInventoryAuxiliarySoftWaterReducingAgent(float todayInventoryAuxiliarySoftWaterReducingAgent) {
        this.todayInventoryAuxiliarySoftWaterReducingAgent = todayInventoryAuxiliarySoftWaterReducingAgent;
    }

    public float getTodayInventoryAuxiliarySoftWaterScaleInhibitor() {
        return todayInventoryAuxiliarySoftWaterScaleInhibitor;
    }

    public void setTodayInventoryAuxiliarySoftWaterScaleInhibitor(float todayInventoryAuxiliarySoftWaterScaleInhibitor) {
        this.todayInventoryAuxiliarySoftWaterScaleInhibitor = todayInventoryAuxiliarySoftWaterScaleInhibitor;
    }

    public float getTodayInventoryAuxiliaryAmmonia() {
        return todayInventoryAuxiliaryAmmonia;
    }

    public void setTodayInventoryAuxiliaryAmmonia(float todayInventoryAuxiliaryAmmonia) {
        this.todayInventoryAuxiliaryAmmonia = todayInventoryAuxiliaryAmmonia;
    }

    public float getTodayInventoryAuxiliaryWaterReducingAgent() {
        return todayInventoryAuxiliaryWaterReducingAgent;
    }

    public void setTodayInventoryAuxiliaryWaterReducingAgent(float todayInventoryAuxiliaryWaterReducingAgent) {
        this.todayInventoryAuxiliaryWaterReducingAgent = todayInventoryAuxiliaryWaterReducingAgent;
    }

    public float getTodayInventoryAuxiliaryWaterScaleInhibitor() {
        return todayInventoryAuxiliaryWaterScaleInhibitor;
    }

    public void setTodayInventoryAuxiliaryWaterScaleInhibitor(float todayInventoryAuxiliaryWaterScaleInhibitor) {
        this.todayInventoryAuxiliaryWaterScaleInhibitor = todayInventoryAuxiliaryWaterScaleInhibitor;
    }

    public float getTodayInventoryAuxiliaryNaclo() {
        return todayInventoryAuxiliaryNaclo;
    }

    public void setTodayInventoryAuxiliaryNaclo(float todayInventoryAuxiliaryNaclo) {
        this.todayInventoryAuxiliaryNaclo = todayInventoryAuxiliaryNaclo;
    }

    public float getTodayInventoryAuxiliaryDeodorant() {
        return todayInventoryAuxiliaryDeodorant;
    }

    public void setTodayInventoryAuxiliaryDeodorant(float todayInventoryAuxiliaryDeodorant) {
        this.todayInventoryAuxiliaryDeodorant = todayInventoryAuxiliaryDeodorant;
    }

    public float getTodayInventoryAuxiliarySalt() {
        return todayInventoryAuxiliarySalt;
    }

    public void setTodayInventoryAuxiliarySalt(float todayInventoryAuxiliarySalt) {
        this.todayInventoryAuxiliarySalt = todayInventoryAuxiliarySalt;
    }

    public float getTodayInventoryAuxiliarySlagBag() {
        return todayInventoryAuxiliarySlagBag;
    }

    public void setTodayInventoryAuxiliarySlagBag(float todayInventoryAuxiliarySlagBag) {
        this.todayInventoryAuxiliarySlagBag = todayInventoryAuxiliarySlagBag;
    }

    public float getTodayInventoryAuxiliaryFlyAshBag() {
        return todayInventoryAuxiliaryFlyAshBag;
    }

    public void setTodayInventoryAuxiliaryFlyAshBag(float todayInventoryAuxiliaryFlyAshBag) {
        this.todayInventoryAuxiliaryFlyAshBag = todayInventoryAuxiliaryFlyAshBag;
    }

    public float getTodayInventoryAuxiliaryMedicalWastesBag() {
        return todayInventoryAuxiliaryMedicalWastesBag;
    }

    public void setTodayInventoryAuxiliaryMedicalWastesBag(float todayInventoryAuxiliaryMedicalWastesBag) {
        this.todayInventoryAuxiliaryMedicalWastesBag = todayInventoryAuxiliaryMedicalWastesBag;
    }

    public float getTodayInventoryAuxiliaryMedicalPackingPlasticBag() {
        return todayInventoryAuxiliaryMedicalPackingPlasticBag;
    }

    public void setTodayInventoryAuxiliaryMedicalPackingPlasticBag(float todayInventoryAuxiliaryMedicalPackingPlasticBag) {
        this.todayInventoryAuxiliaryMedicalPackingPlasticBag = todayInventoryAuxiliaryMedicalPackingPlasticBag;
    }

    public float getTodayInventoryAuxiliaryCollectionBox() {
        return todayInventoryAuxiliaryCollectionBox;
    }

    public void setTodayInventoryAuxiliaryCollectionBox(float todayInventoryAuxiliaryCollectionBox) {
        this.todayInventoryAuxiliaryCollectionBox = todayInventoryAuxiliaryCollectionBox;
    }

    public float getTodayInventoryAuxiliaryStandardBox() {
        return todayInventoryAuxiliaryStandardBox;
    }

    public void setTodayInventoryAuxiliaryStandardBox(float todayInventoryAuxiliaryStandardBox) {
        this.todayInventoryAuxiliaryStandardBox = todayInventoryAuxiliaryStandardBox;
    }

    public float getTodayInventoryAuxiliaryWoodenPallets() {
        return todayInventoryAuxiliaryWoodenPallets;
    }

    public void setTodayInventoryAuxiliaryWoodenPallets(float todayInventoryAuxiliaryWoodenPallets) {
        this.todayInventoryAuxiliaryWoodenPallets = todayInventoryAuxiliaryWoodenPallets;
    }

    public float getTodayInventoryAuxiliaryStandardTray_1m() {
        return todayInventoryAuxiliaryStandardTray_1m;
    }

    public void setTodayInventoryAuxiliaryStandardTray_1m(float todayInventoryAuxiliaryStandardTray_1m) {
        this.todayInventoryAuxiliaryStandardTray_1m = todayInventoryAuxiliaryStandardTray_1m;
    }

    public float getTodayInventoryAuxiliaryStandardTray_1_2m() {
        return todayInventoryAuxiliaryStandardTray_1_2m;
    }

    public void setTodayInventoryAuxiliaryStandardTray_1_2m(float todayInventoryAuxiliaryStandardTray_1_2m) {
        this.todayInventoryAuxiliaryStandardTray_1_2m = todayInventoryAuxiliaryStandardTray_1_2m;
    }

    public float getTodayInventoryAuxiliaryTonBox() {
        return todayInventoryAuxiliaryTonBox;
    }

    public void setTodayInventoryAuxiliaryTonBox(float todayInventoryAuxiliaryTonBox) {
        this.todayInventoryAuxiliaryTonBox = todayInventoryAuxiliaryTonBox;
    }

    public float getTodayInventoryAuxiliarySteam() {
        return todayInventoryAuxiliarySteam;
    }

    public void setTodayInventoryAuxiliarySteam(float todayInventoryAuxiliarySteam) {
        this.todayInventoryAuxiliarySteam = todayInventoryAuxiliarySteam;
    }

    public float getTodayInventoryAuxiliaryDieselOil() {
        return todayInventoryAuxiliaryDieselOil;
    }

    public void setTodayInventoryAuxiliaryDieselOil(float todayInventoryAuxiliaryDieselOil) {
        this.todayInventoryAuxiliaryDieselOil = todayInventoryAuxiliaryDieselOil;
    }

    public float getTodayInventoryAuxiliaryNaturalGas() {
        return todayInventoryAuxiliaryNaturalGas;
    }

    public void setTodayInventoryAuxiliaryNaturalGas(float todayInventoryAuxiliaryNaturalGas) {
        this.todayInventoryAuxiliaryNaturalGas = todayInventoryAuxiliaryNaturalGas;
    }

    public float getTodayInventoryAuxiliaryElectricQuantity() {
        return todayInventoryAuxiliaryElectricQuantity;
    }

    public void setTodayInventoryAuxiliaryElectricQuantity(float todayInventoryAuxiliaryElectricQuantity) {
        this.todayInventoryAuxiliaryElectricQuantity = todayInventoryAuxiliaryElectricQuantity;
    }

    public float getTodayInventoryAuxiliaryIndustrialWater() {
        return todayInventoryAuxiliaryIndustrialWater;
    }

    public void setTodayInventoryAuxiliaryIndustrialWater(float todayInventoryAuxiliaryIndustrialWater) {
        this.todayInventoryAuxiliaryIndustrialWater = todayInventoryAuxiliaryIndustrialWater;
    }

    public float getTodayInventoryAuxiliaryTapWaterQuantity() {
        return todayInventoryAuxiliaryTapWaterQuantity;
    }

    public void setTodayInventoryAuxiliaryTapWaterQuantity(float todayInventoryAuxiliaryTapWaterQuantity) {
        this.todayInventoryAuxiliaryTapWaterQuantity = todayInventoryAuxiliaryTapWaterQuantity;
    }

    public float getTodayDisposalMedicalAuxiliaryNaclo() {
        return todayDisposalMedicalAuxiliaryNaclo;
    }

    public void setTodayDisposalMedicalAuxiliaryNaclo(float todayDisposalMedicalAuxiliaryNaclo) {
        this.todayDisposalMedicalAuxiliaryNaclo = todayDisposalMedicalAuxiliaryNaclo;
    }

    public float getTodayDisposalMedicalAuxiliaryDeodorant() {
        return todayDisposalMedicalAuxiliaryDeodorant;
    }

    public void setTodayDisposalMedicalAuxiliaryDeodorant(float todayDisposalMedicalAuxiliaryDeodorant) {
        this.todayDisposalMedicalAuxiliaryDeodorant = todayDisposalMedicalAuxiliaryDeodorant;
    }

    public float getTodayDisposalMedicalAuxiliaryMedicalWastesBag() {
        return todayDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public void setTodayDisposalMedicalAuxiliaryMedicalWastesBag(float todayDisposalMedicalAuxiliaryMedicalWastesBag) {
        this.todayDisposalMedicalAuxiliaryMedicalWastesBag = todayDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public float getTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag() {
        return todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public void setTodayDisposalMedicalAuxiliaryMedicalPackingPlasticBag(float todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag) {
        this.todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag = todayDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public float getTodayDisposalMedicalAuxiliaryCollectionBox() {
        return todayDisposalMedicalAuxiliaryCollectionBox;
    }

    public void setTodayDisposalMedicalAuxiliaryCollectionBox(float todayDisposalMedicalAuxiliaryCollectionBox) {
        this.todayDisposalMedicalAuxiliaryCollectionBox = todayDisposalMedicalAuxiliaryCollectionBox;
    }

    public float getTodayDisposalMedicalAuxiliarySteam() {
        return todayDisposalMedicalAuxiliarySteam;
    }

    public void setTodayDisposalMedicalAuxiliarySteam(float todayDisposalMedicalAuxiliarySteam) {
        this.todayDisposalMedicalAuxiliarySteam = todayDisposalMedicalAuxiliarySteam;
    }

    public float getTodayDisposalMedicalAuxiliaryIndustrialWater() {
        return todayDisposalMedicalAuxiliaryIndustrialWater;
    }

    public void setTodayDisposalMedicalAuxiliaryIndustrialWater(float todayDisposalMedicalAuxiliaryIndustrialWater) {
        this.todayDisposalMedicalAuxiliaryIndustrialWater = todayDisposalMedicalAuxiliaryIndustrialWater;
    }

    public float getTodayDisposalMedicalAuxiliaryElectricQuantity() {
        return todayDisposalMedicalAuxiliaryElectricQuantity;
    }

    public void setTodayDisposalMedicalAuxiliaryElectricQuantity(float todayDisposalMedicalAuxiliaryElectricQuantity) {
        this.todayDisposalMedicalAuxiliaryElectricQuantity = todayDisposalMedicalAuxiliaryElectricQuantity;
    }

    public float getTodayDisposalSecondaryAuxiliaryCalcareousLime() {
        return todayDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public void setTodayDisposalSecondaryAuxiliaryCalcareousLime(float todayDisposalSecondaryAuxiliaryCalcareousLime) {
        this.todayDisposalSecondaryAuxiliaryCalcareousLime = todayDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public float getTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon() {
        return todayDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayDisposalSecondaryAuxiliaryCommonActivatedCarbon(float todayDisposalSecondaryAuxiliaryCommonActivatedCarbon) {
        this.todayDisposalSecondaryAuxiliaryCommonActivatedCarbon = todayDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayDisposalSecondaryAuxiliaryActivatedCarbon() {
        return todayDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public void setTodayDisposalSecondaryAuxiliaryActivatedCarbon(float todayDisposalSecondaryAuxiliaryActivatedCarbon) {
        this.todayDisposalSecondaryAuxiliaryActivatedCarbon = todayDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public float getTodayDisposalSecondaryAuxiliaryActivatedCarbonParticles() {
        return todayDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayDisposalSecondaryAuxiliaryActivatedCarbonParticles(float todayDisposalSecondaryAuxiliaryActivatedCarbonParticles) {
        this.todayDisposalSecondaryAuxiliaryActivatedCarbonParticles = todayDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayDisposalSecondaryAuxiliaryLye() {
        return todayDisposalSecondaryAuxiliaryLye;
    }

    public void setTodayDisposalSecondaryAuxiliaryLye(float todayDisposalSecondaryAuxiliaryLye) {
        this.todayDisposalSecondaryAuxiliaryLye = todayDisposalSecondaryAuxiliaryLye;
    }

    public float getTodayDisposalSecondaryAuxiliarySalt() {
        return todayDisposalSecondaryAuxiliarySalt;
    }

    public void setTodayDisposalSecondaryAuxiliarySalt(float todayDisposalSecondaryAuxiliarySalt) {
        this.todayDisposalSecondaryAuxiliarySalt = todayDisposalSecondaryAuxiliarySalt;
    }

    public float getTodayDisposalSecondaryAuxiliarySlagBag() {
        return todayDisposalSecondaryAuxiliarySlagBag;
    }

    public void setTodayDisposalSecondaryAuxiliarySlagBag(float todayDisposalSecondaryAuxiliarySlagBag) {
        this.todayDisposalSecondaryAuxiliarySlagBag = todayDisposalSecondaryAuxiliarySlagBag;
    }

    public float getTodayDisposalSecondaryAuxiliaryFlyAshBag() {
        return todayDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public void setTodayDisposalSecondaryAuxiliaryFlyAshBag(float todayDisposalSecondaryAuxiliaryFlyAshBag) {
        this.todayDisposalSecondaryAuxiliaryFlyAshBag = todayDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public float getTodayDisposalSecondaryAuxiliaryDieselOil() {
        return todayDisposalSecondaryAuxiliaryDieselOil;
    }

    public void setTodayDisposalSecondaryAuxiliaryDieselOil(float todayDisposalSecondaryAuxiliaryDieselOil) {
        this.todayDisposalSecondaryAuxiliaryDieselOil = todayDisposalSecondaryAuxiliaryDieselOil;
    }

    public float getTodayDisposalSecondaryAuxiliaryIndustrialWater() {
        return todayDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public void setTodayDisposalSecondaryAuxiliaryIndustrialWater(float todayDisposalSecondaryAuxiliaryIndustrialWater) {
        this.todayDisposalSecondaryAuxiliaryIndustrialWater = todayDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public float getTodayDisposalSecondaryAuxiliaryElectricQuantity() {
        return todayDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public void setTodayDisposalSecondaryAuxiliaryElectricQuantity(float todayDisposalSecondaryAuxiliaryElectricQuantity) {
        this.todayDisposalSecondaryAuxiliaryElectricQuantity = todayDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public float getTodayDisposalSecondaryAuxiliaryWoodenPallets() {
        return todayDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public void setTodayDisposalSecondaryAuxiliaryWoodenPallets(float todayDisposalSecondaryAuxiliaryWoodenPallets) {
        this.todayDisposalSecondaryAuxiliaryWoodenPallets = todayDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public float getTodayDisposalThirdAuxiliaryCalcareousLime() {
        return todayDisposalThirdAuxiliaryCalcareousLime;
    }

    public void setTodayDisposalThirdAuxiliaryCalcareousLime(float todayDisposalThirdAuxiliaryCalcareousLime) {
        this.todayDisposalThirdAuxiliaryCalcareousLime = todayDisposalThirdAuxiliaryCalcareousLime;
    }

    public float getTodayDisposalThirdAuxiliaryCommonActivatedCarbon() {
        return todayDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayDisposalThirdAuxiliaryCommonActivatedCarbon(float todayDisposalThirdAuxiliaryCommonActivatedCarbon) {
        this.todayDisposalThirdAuxiliaryCommonActivatedCarbon = todayDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayDisposalThirdAuxiliaryActivatedCarbon() {
        return todayDisposalThirdAuxiliaryActivatedCarbon;
    }

    public void setTodayDisposalThirdAuxiliaryActivatedCarbon(float todayDisposalThirdAuxiliaryActivatedCarbon) {
        this.todayDisposalThirdAuxiliaryActivatedCarbon = todayDisposalThirdAuxiliaryActivatedCarbon;
    }

    public float getTodayDisposalThirdAuxiliaryActivatedCarbonParticles() {
        return todayDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayDisposalThirdAuxiliaryActivatedCarbonParticles(float todayDisposalThirdAuxiliaryActivatedCarbonParticles) {
        this.todayDisposalThirdAuxiliaryActivatedCarbonParticles = todayDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayDisposalThirdAuxiliaryLye() {
        return todayDisposalThirdAuxiliaryLye;
    }

    public void setTodayDisposalThirdAuxiliaryLye(float todayDisposalThirdAuxiliaryLye) {
        this.todayDisposalThirdAuxiliaryLye = todayDisposalThirdAuxiliaryLye;
    }

    public float getTodayDisposalThirdAuxiliaryCausticSoda() {
        return todayDisposalThirdAuxiliaryCausticSoda;
    }

    public void setTodayDisposalThirdAuxiliaryCausticSoda(float todayDisposalThirdAuxiliaryCausticSoda) {
        this.todayDisposalThirdAuxiliaryCausticSoda = todayDisposalThirdAuxiliaryCausticSoda;
    }

    public float getTodayDisposalThirdAuxiliaryUrea() {
        return todayDisposalThirdAuxiliaryUrea;
    }

    public void setTodayDisposalThirdAuxiliaryUrea(float todayDisposalThirdAuxiliaryUrea) {
        this.todayDisposalThirdAuxiliaryUrea = todayDisposalThirdAuxiliaryUrea;
    }

    public float getTodayDisposalThirdAuxiliaryHydrochloricAcid() {
        return todayDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public void setTodayDisposalThirdAuxiliaryHydrochloricAcid(float todayDisposalThirdAuxiliaryHydrochloricAcid) {
        this.todayDisposalThirdAuxiliaryHydrochloricAcid = todayDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public float getTodayDisposalThirdAuxiliaryNahco3() {
        return todayDisposalThirdAuxiliaryNahco3;
    }

    public void setTodayDisposalThirdAuxiliaryNahco3(float todayDisposalThirdAuxiliaryNahco3) {
        this.todayDisposalThirdAuxiliaryNahco3 = todayDisposalThirdAuxiliaryNahco3;
    }

    public float getTodayDisposalThirdAuxiliaryFlour() {
        return todayDisposalThirdAuxiliaryFlour;
    }

    public void setTodayDisposalThirdAuxiliaryFlour(float todayDisposalThirdAuxiliaryFlour) {
        this.todayDisposalThirdAuxiliaryFlour = todayDisposalThirdAuxiliaryFlour;
    }

    public float getTodayDisposalThirdAuxiliaryDefoamer() {
        return todayDisposalThirdAuxiliaryDefoamer;
    }

    public void setTodayDisposalThirdAuxiliaryDefoamer(float todayDisposalThirdAuxiliaryDefoamer) {
        this.todayDisposalThirdAuxiliaryDefoamer = todayDisposalThirdAuxiliaryDefoamer;
    }

    public float getTodayDisposalThirdAuxiliaryFlocculant() {
        return todayDisposalThirdAuxiliaryFlocculant;
    }

    public void setTodayDisposalThirdAuxiliaryFlocculant(float todayDisposalThirdAuxiliaryFlocculant) {
        this.todayDisposalThirdAuxiliaryFlocculant = todayDisposalThirdAuxiliaryFlocculant;
    }

    public float getTodayDisposalThirdAuxiliarySoftWaterReducingAgent() {
        return todayDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public void setTodayDisposalThirdAuxiliarySoftWaterReducingAgent(float todayDisposalThirdAuxiliarySoftWaterReducingAgent) {
        this.todayDisposalThirdAuxiliarySoftWaterReducingAgent = todayDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public float getTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor() {
        return todayDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public void setTodayDisposalThirdAuxiliarySoftWaterScaleInhibitor(float todayDisposalThirdAuxiliarySoftWaterScaleInhibitor) {
        this.todayDisposalThirdAuxiliarySoftWaterScaleInhibitor = todayDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public float getTodayDisposalThirdAuxiliaryAmmonia() {
        return todayDisposalThirdAuxiliaryAmmonia;
    }

    public void setTodayDisposalThirdAuxiliaryAmmonia(float todayDisposalThirdAuxiliaryAmmonia) {
        this.todayDisposalThirdAuxiliaryAmmonia = todayDisposalThirdAuxiliaryAmmonia;
    }

    public float getTodayDisposalThirdAuxiliaryWaterReducingAgent() {
        return todayDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public void setTodayDisposalThirdAuxiliaryWaterReducingAgent(float todayDisposalThirdAuxiliaryWaterReducingAgent) {
        this.todayDisposalThirdAuxiliaryWaterReducingAgent = todayDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public float getTodayDisposalThirdAuxiliaryWaterScaleInhibitor() {
        return todayDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public void setTodayDisposalThirdAuxiliaryWaterScaleInhibitor(float todayDisposalThirdAuxiliaryWaterScaleInhibitor) {
        this.todayDisposalThirdAuxiliaryWaterScaleInhibitor = todayDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public float getTodayDisposalThirdAuxiliaryNaclo() {
        return todayDisposalThirdAuxiliaryNaclo;
    }

    public void setTodayDisposalThirdAuxiliaryNaclo(float todayDisposalThirdAuxiliaryNaclo) {
        this.todayDisposalThirdAuxiliaryNaclo = todayDisposalThirdAuxiliaryNaclo;
    }

    public float getTodayDisposalThirdAuxiliaryStandardBox() {
        return todayDisposalThirdAuxiliaryStandardBox;
    }

    public void setTodayDisposalThirdAuxiliaryStandardBox(float todayDisposalThirdAuxiliaryStandardBox) {
        this.todayDisposalThirdAuxiliaryStandardBox = todayDisposalThirdAuxiliaryStandardBox;
    }

    public float getTodayDisposalThirdAuxiliaryWoodenPallets() {
        return todayDisposalThirdAuxiliaryWoodenPallets;
    }

    public void setTodayDisposalThirdAuxiliaryWoodenPallets(float todayDisposalThirdAuxiliaryWoodenPallets) {
        this.todayDisposalThirdAuxiliaryWoodenPallets = todayDisposalThirdAuxiliaryWoodenPallets;
    }

    public float getTodayDisposalThirdAuxiliaryStandardTray_1m() {
        return todayDisposalThirdAuxiliaryStandardTray_1m;
    }

    public void setTodayDisposalThirdAuxiliaryStandardTray_1m(float todayDisposalThirdAuxiliaryStandardTray_1m) {
        this.todayDisposalThirdAuxiliaryStandardTray_1m = todayDisposalThirdAuxiliaryStandardTray_1m;
    }

    public float getTodayDisposalThirdAuxiliaryStandardTray_1_2m() {
        return todayDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public void setTodayDisposalThirdAuxiliaryStandardTray_1_2m(float todayDisposalThirdAuxiliaryStandardTray_1_2m) {
        this.todayDisposalThirdAuxiliaryStandardTray_1_2m = todayDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public float getTodayDisposalThirdAuxiliarySlagBag() {
        return todayDisposalThirdAuxiliarySlagBag;
    }

    public void setTodayDisposalThirdAuxiliarySlagBag(float todayDisposalThirdAuxiliarySlagBag) {
        this.todayDisposalThirdAuxiliarySlagBag = todayDisposalThirdAuxiliarySlagBag;
    }

    public float getTodayDisposalThirdAuxiliaryFlyAshBag() {
        return todayDisposalThirdAuxiliaryFlyAshBag;
    }

    public void setTodayDisposalThirdAuxiliaryFlyAshBag(float todayDisposalThirdAuxiliaryFlyAshBag) {
        this.todayDisposalThirdAuxiliaryFlyAshBag = todayDisposalThirdAuxiliaryFlyAshBag;
    }

    public float getTodayDisposalThirdAuxiliaryTonBox() {
        return todayDisposalThirdAuxiliaryTonBox;
    }

    public void setTodayDisposalThirdAuxiliaryTonBox(float todayDisposalThirdAuxiliaryTonBox) {
        this.todayDisposalThirdAuxiliaryTonBox = todayDisposalThirdAuxiliaryTonBox;
    }

    public float getTodayDisposalThirdAuxiliarySteam() {
        return todayDisposalThirdAuxiliarySteam;
    }

    public void setTodayDisposalThirdAuxiliarySteam(float todayDisposalThirdAuxiliarySteam) {
        this.todayDisposalThirdAuxiliarySteam = todayDisposalThirdAuxiliarySteam;
    }

    public float getTodayDisposalThirdAuxiliaryDieselOil() {
        return todayDisposalThirdAuxiliaryDieselOil;
    }

    public void setTodayDisposalThirdAuxiliaryDieselOil(float todayDisposalThirdAuxiliaryDieselOil) {
        this.todayDisposalThirdAuxiliaryDieselOil = todayDisposalThirdAuxiliaryDieselOil;
    }

    public float getTodayDisposalThirdAuxiliaryNaturalGas() {
        return todayDisposalThirdAuxiliaryNaturalGas;
    }

    public void setTodayDisposalThirdAuxiliaryNaturalGas(float todayDisposalThirdAuxiliaryNaturalGas) {
        this.todayDisposalThirdAuxiliaryNaturalGas = todayDisposalThirdAuxiliaryNaturalGas;
    }

    public float getTodayDisposalThirdAuxiliaryIndustrialWater() {
        return todayDisposalThirdAuxiliaryIndustrialWater;
    }

    public void setTodayDisposalThirdAuxiliaryIndustrialWater(float todayDisposalThirdAuxiliaryIndustrialWater) {
        this.todayDisposalThirdAuxiliaryIndustrialWater = todayDisposalThirdAuxiliaryIndustrialWater;
    }

    public float getTodayDisposalThirdAuxiliaryElectricQuantity() {
        return todayDisposalThirdAuxiliaryElectricQuantity;
    }

    public void setTodayDisposalThirdAuxiliaryElectricQuantity(float todayDisposalThirdAuxiliaryElectricQuantity) {
        this.todayDisposalThirdAuxiliaryElectricQuantity = todayDisposalThirdAuxiliaryElectricQuantity;
    }

    public float getTodayDisposalThirdAuxiliaryTapWaterQuantity() {
        return todayDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public void setTodayDisposalThirdAuxiliaryTapWaterQuantity(float todayDisposalThirdAuxiliaryTapWaterQuantity) {
        this.todayDisposalThirdAuxiliaryTapWaterQuantity = todayDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public float getTodayDisposalTowerElectricQuantity() {
        return todayDisposalTowerElectricQuantity;
    }

    public void setTodayDisposalTowerElectricQuantity(float todayDisposalTowerElectricQuantity) {
        this.todayDisposalTowerElectricQuantity = todayDisposalTowerElectricQuantity;
    }

    public float getMonthDisposalMedicalAuxiliaryNaclo() {
        return monthDisposalMedicalAuxiliaryNaclo;
    }

    public void setMonthDisposalMedicalAuxiliaryNaclo(float monthDisposalMedicalAuxiliaryNaclo) {
        this.monthDisposalMedicalAuxiliaryNaclo = monthDisposalMedicalAuxiliaryNaclo;
    }

    public float getMonthDisposalMedicalAuxiliaryDeodorant() {
        return monthDisposalMedicalAuxiliaryDeodorant;
    }

    public void setMonthDisposalMedicalAuxiliaryDeodorant(float monthDisposalMedicalAuxiliaryDeodorant) {
        this.monthDisposalMedicalAuxiliaryDeodorant = monthDisposalMedicalAuxiliaryDeodorant;
    }

    public float getMonthDisposalMedicalAuxiliaryMedicalWastesBag() {
        return monthDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public void setMonthDisposalMedicalAuxiliaryMedicalWastesBag(float monthDisposalMedicalAuxiliaryMedicalWastesBag) {
        this.monthDisposalMedicalAuxiliaryMedicalWastesBag = monthDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public float getMonthDisposalMedicalAuxiliaryMedicalPackingPlasticBag() {
        return monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public void setMonthDisposalMedicalAuxiliaryMedicalPackingPlasticBag(float monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag) {
        this.monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag = monthDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public float getMonthDisposalMedicalAuxiliaryCollectionBox() {
        return monthDisposalMedicalAuxiliaryCollectionBox;
    }

    public void setMonthDisposalMedicalAuxiliaryCollectionBox(float monthDisposalMedicalAuxiliaryCollectionBox) {
        this.monthDisposalMedicalAuxiliaryCollectionBox = monthDisposalMedicalAuxiliaryCollectionBox;
    }

    public float getMonthDisposalMedicalAuxiliarySteam() {
        return monthDisposalMedicalAuxiliarySteam;
    }

    public void setMonthDisposalMedicalAuxiliarySteam(float monthDisposalMedicalAuxiliarySteam) {
        this.monthDisposalMedicalAuxiliarySteam = monthDisposalMedicalAuxiliarySteam;
    }

    public float getMonthDisposalMedicalAuxiliaryIndustrialWater() {
        return monthDisposalMedicalAuxiliaryIndustrialWater;
    }

    public void setMonthDisposalMedicalAuxiliaryIndustrialWater(float monthDisposalMedicalAuxiliaryIndustrialWater) {
        this.monthDisposalMedicalAuxiliaryIndustrialWater = monthDisposalMedicalAuxiliaryIndustrialWater;
    }

    public float getMonthDisposalMedicalAuxiliaryElectricQuantity() {
        return monthDisposalMedicalAuxiliaryElectricQuantity;
    }

    public void setMonthDisposalMedicalAuxiliaryElectricQuantity(float monthDisposalMedicalAuxiliaryElectricQuantity) {
        this.monthDisposalMedicalAuxiliaryElectricQuantity = monthDisposalMedicalAuxiliaryElectricQuantity;
    }

    public float getMonthDisposalSecondaryAuxiliaryCalcareousLime() {
        return monthDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public void setMonthDisposalSecondaryAuxiliaryCalcareousLime(float monthDisposalSecondaryAuxiliaryCalcareousLime) {
        this.monthDisposalSecondaryAuxiliaryCalcareousLime = monthDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public float getMonthDisposalSecondaryAuxiliaryCommonActivatedCarbon() {
        return monthDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthDisposalSecondaryAuxiliaryCommonActivatedCarbon(float monthDisposalSecondaryAuxiliaryCommonActivatedCarbon) {
        this.monthDisposalSecondaryAuxiliaryCommonActivatedCarbon = monthDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthDisposalSecondaryAuxiliaryActivatedCarbon() {
        return monthDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public void setMonthDisposalSecondaryAuxiliaryActivatedCarbon(float monthDisposalSecondaryAuxiliaryActivatedCarbon) {
        this.monthDisposalSecondaryAuxiliaryActivatedCarbon = monthDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public float getMonthDisposalSecondaryAuxiliaryActivatedCarbonParticles() {
        return monthDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthDisposalSecondaryAuxiliaryActivatedCarbonParticles(float monthDisposalSecondaryAuxiliaryActivatedCarbonParticles) {
        this.monthDisposalSecondaryAuxiliaryActivatedCarbonParticles = monthDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthDisposalSecondaryAuxiliaryLye() {
        return monthDisposalSecondaryAuxiliaryLye;
    }

    public void setMonthDisposalSecondaryAuxiliaryLye(float monthDisposalSecondaryAuxiliaryLye) {
        this.monthDisposalSecondaryAuxiliaryLye = monthDisposalSecondaryAuxiliaryLye;
    }

    public float getMonthDisposalSecondaryAuxiliarySalt() {
        return monthDisposalSecondaryAuxiliarySalt;
    }

    public void setMonthDisposalSecondaryAuxiliarySalt(float monthDisposalSecondaryAuxiliarySalt) {
        this.monthDisposalSecondaryAuxiliarySalt = monthDisposalSecondaryAuxiliarySalt;
    }

    public float getMonthDisposalSecondaryAuxiliarySlagBag() {
        return monthDisposalSecondaryAuxiliarySlagBag;
    }

    public void setMonthDisposalSecondaryAuxiliarySlagBag(float monthDisposalSecondaryAuxiliarySlagBag) {
        this.monthDisposalSecondaryAuxiliarySlagBag = monthDisposalSecondaryAuxiliarySlagBag;
    }

    public float getMonthDisposalSecondaryAuxiliaryFlyAshBag() {
        return monthDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public void setMonthDisposalSecondaryAuxiliaryFlyAshBag(float monthDisposalSecondaryAuxiliaryFlyAshBag) {
        this.monthDisposalSecondaryAuxiliaryFlyAshBag = monthDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public float getMonthDisposalSecondaryAuxiliaryDieselOil() {
        return monthDisposalSecondaryAuxiliaryDieselOil;
    }

    public void setMonthDisposalSecondaryAuxiliaryDieselOil(float monthDisposalSecondaryAuxiliaryDieselOil) {
        this.monthDisposalSecondaryAuxiliaryDieselOil = monthDisposalSecondaryAuxiliaryDieselOil;
    }

    public float getMonthDisposalSecondaryAuxiliaryIndustrialWater() {
        return monthDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public void setMonthDisposalSecondaryAuxiliaryIndustrialWater(float monthDisposalSecondaryAuxiliaryIndustrialWater) {
        this.monthDisposalSecondaryAuxiliaryIndustrialWater = monthDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public float getMonthDisposalSecondaryAuxiliaryElectricQuantity() {
        return monthDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public void setMonthDisposalSecondaryAuxiliaryElectricQuantity(float monthDisposalSecondaryAuxiliaryElectricQuantity) {
        this.monthDisposalSecondaryAuxiliaryElectricQuantity = monthDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public float getMonthDisposalSecondaryAuxiliaryWoodenPallets() {
        return monthDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public void setMonthDisposalSecondaryAuxiliaryWoodenPallets(float monthDisposalSecondaryAuxiliaryWoodenPallets) {
        this.monthDisposalSecondaryAuxiliaryWoodenPallets = monthDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public float getMonthDisposalThirdAuxiliaryCalcareousLime() {
        return monthDisposalThirdAuxiliaryCalcareousLime;
    }

    public void setMonthDisposalThirdAuxiliaryCalcareousLime(float monthDisposalThirdAuxiliaryCalcareousLime) {
        this.monthDisposalThirdAuxiliaryCalcareousLime = monthDisposalThirdAuxiliaryCalcareousLime;
    }

    public float getMonthDisposalThirdAuxiliaryCommonActivatedCarbon() {
        return monthDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthDisposalThirdAuxiliaryCommonActivatedCarbon(float monthDisposalThirdAuxiliaryCommonActivatedCarbon) {
        this.monthDisposalThirdAuxiliaryCommonActivatedCarbon = monthDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthDisposalThirdAuxiliaryActivatedCarbon() {
        return monthDisposalThirdAuxiliaryActivatedCarbon;
    }

    public void setMonthDisposalThirdAuxiliaryActivatedCarbon(float monthDisposalThirdAuxiliaryActivatedCarbon) {
        this.monthDisposalThirdAuxiliaryActivatedCarbon = monthDisposalThirdAuxiliaryActivatedCarbon;
    }

    public float getMonthDisposalThirdAuxiliaryActivatedCarbonParticles() {
        return monthDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthDisposalThirdAuxiliaryActivatedCarbonParticles(float monthDisposalThirdAuxiliaryActivatedCarbonParticles) {
        this.monthDisposalThirdAuxiliaryActivatedCarbonParticles = monthDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthDisposalThirdAuxiliaryLye() {
        return monthDisposalThirdAuxiliaryLye;
    }

    public void setMonthDisposalThirdAuxiliaryLye(float monthDisposalThirdAuxiliaryLye) {
        this.monthDisposalThirdAuxiliaryLye = monthDisposalThirdAuxiliaryLye;
    }

    public float getMonthDisposalThirdAuxiliaryCausticSoda() {
        return monthDisposalThirdAuxiliaryCausticSoda;
    }

    public void setMonthDisposalThirdAuxiliaryCausticSoda(float monthDisposalThirdAuxiliaryCausticSoda) {
        this.monthDisposalThirdAuxiliaryCausticSoda = monthDisposalThirdAuxiliaryCausticSoda;
    }

    public float getMonthDisposalThirdAuxiliaryUrea() {
        return monthDisposalThirdAuxiliaryUrea;
    }

    public void setMonthDisposalThirdAuxiliaryUrea(float monthDisposalThirdAuxiliaryUrea) {
        this.monthDisposalThirdAuxiliaryUrea = monthDisposalThirdAuxiliaryUrea;
    }

    public float getMonthDisposalThirdAuxiliaryHydrochloricAcid() {
        return monthDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public void setMonthDisposalThirdAuxiliaryHydrochloricAcid(float monthDisposalThirdAuxiliaryHydrochloricAcid) {
        this.monthDisposalThirdAuxiliaryHydrochloricAcid = monthDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public float getMonthDisposalThirdAuxiliaryNahco3() {
        return monthDisposalThirdAuxiliaryNahco3;
    }

    public void setMonthDisposalThirdAuxiliaryNahco3(float monthDisposalThirdAuxiliaryNahco3) {
        this.monthDisposalThirdAuxiliaryNahco3 = monthDisposalThirdAuxiliaryNahco3;
    }

    public float getMonthDisposalThirdAuxiliaryFlour() {
        return monthDisposalThirdAuxiliaryFlour;
    }

    public void setMonthDisposalThirdAuxiliaryFlour(float monthDisposalThirdAuxiliaryFlour) {
        this.monthDisposalThirdAuxiliaryFlour = monthDisposalThirdAuxiliaryFlour;
    }

    public float getMonthDisposalThirdAuxiliaryDefoamer() {
        return monthDisposalThirdAuxiliaryDefoamer;
    }

    public void setMonthDisposalThirdAuxiliaryDefoamer(float monthDisposalThirdAuxiliaryDefoamer) {
        this.monthDisposalThirdAuxiliaryDefoamer = monthDisposalThirdAuxiliaryDefoamer;
    }

    public float getMonthDisposalThirdAuxiliaryFlocculant() {
        return monthDisposalThirdAuxiliaryFlocculant;
    }

    public void setMonthDisposalThirdAuxiliaryFlocculant(float monthDisposalThirdAuxiliaryFlocculant) {
        this.monthDisposalThirdAuxiliaryFlocculant = monthDisposalThirdAuxiliaryFlocculant;
    }

    public float getMonthDisposalThirdAuxiliarySoftWaterReducingAgent() {
        return monthDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public void setMonthDisposalThirdAuxiliarySoftWaterReducingAgent(float monthDisposalThirdAuxiliarySoftWaterReducingAgent) {
        this.monthDisposalThirdAuxiliarySoftWaterReducingAgent = monthDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public float getMonthDisposalThirdAuxiliarySoftWaterScaleInhibitor() {
        return monthDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public void setMonthDisposalThirdAuxiliarySoftWaterScaleInhibitor(float monthDisposalThirdAuxiliarySoftWaterScaleInhibitor) {
        this.monthDisposalThirdAuxiliarySoftWaterScaleInhibitor = monthDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public float getMonthDisposalThirdAuxiliaryAmmonia() {
        return monthDisposalThirdAuxiliaryAmmonia;
    }

    public void setMonthDisposalThirdAuxiliaryAmmonia(float monthDisposalThirdAuxiliaryAmmonia) {
        this.monthDisposalThirdAuxiliaryAmmonia = monthDisposalThirdAuxiliaryAmmonia;
    }

    public float getMonthDisposalThirdAuxiliaryWaterReducingAgent() {
        return monthDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public void setMonthDisposalThirdAuxiliaryWaterReducingAgent(float monthDisposalThirdAuxiliaryWaterReducingAgent) {
        this.monthDisposalThirdAuxiliaryWaterReducingAgent = monthDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public float getMonthDisposalThirdAuxiliaryWaterScaleInhibitor() {
        return monthDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public void setMonthDisposalThirdAuxiliaryWaterScaleInhibitor(float monthDisposalThirdAuxiliaryWaterScaleInhibitor) {
        this.monthDisposalThirdAuxiliaryWaterScaleInhibitor = monthDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public float getMonthDisposalThirdAuxiliaryNaclo() {
        return monthDisposalThirdAuxiliaryNaclo;
    }

    public void setMonthDisposalThirdAuxiliaryNaclo(float monthDisposalThirdAuxiliaryNaclo) {
        this.monthDisposalThirdAuxiliaryNaclo = monthDisposalThirdAuxiliaryNaclo;
    }

    public float getMonthDisposalThirdAuxiliaryStandardBox() {
        return monthDisposalThirdAuxiliaryStandardBox;
    }

    public void setMonthDisposalThirdAuxiliaryStandardBox(float monthDisposalThirdAuxiliaryStandardBox) {
        this.monthDisposalThirdAuxiliaryStandardBox = monthDisposalThirdAuxiliaryStandardBox;
    }

    public float getMonthDisposalThirdAuxiliaryWoodenPallets() {
        return monthDisposalThirdAuxiliaryWoodenPallets;
    }

    public void setMonthDisposalThirdAuxiliaryWoodenPallets(float monthDisposalThirdAuxiliaryWoodenPallets) {
        this.monthDisposalThirdAuxiliaryWoodenPallets = monthDisposalThirdAuxiliaryWoodenPallets;
    }

    public float getMonthDisposalThirdAuxiliaryStandardTray_1m() {
        return monthDisposalThirdAuxiliaryStandardTray_1m;
    }

    public void setMonthDisposalThirdAuxiliaryStandardTray_1m(float monthDisposalThirdAuxiliaryStandardTray_1m) {
        this.monthDisposalThirdAuxiliaryStandardTray_1m = monthDisposalThirdAuxiliaryStandardTray_1m;
    }

    public float getMonthDisposalThirdAuxiliaryStandardTray_1_2m() {
        return monthDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public void setMonthDisposalThirdAuxiliaryStandardTray_1_2m(float monthDisposalThirdAuxiliaryStandardTray_1_2m) {
        this.monthDisposalThirdAuxiliaryStandardTray_1_2m = monthDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public float getMonthDisposalThirdAuxiliarySlagBag() {
        return monthDisposalThirdAuxiliarySlagBag;
    }

    public void setMonthDisposalThirdAuxiliarySlagBag(float monthDisposalThirdAuxiliarySlagBag) {
        this.monthDisposalThirdAuxiliarySlagBag = monthDisposalThirdAuxiliarySlagBag;
    }

    public float getMonthDisposalThirdAuxiliaryFlyAshBag() {
        return monthDisposalThirdAuxiliaryFlyAshBag;
    }

    public void setMonthDisposalThirdAuxiliaryFlyAshBag(float monthDisposalThirdAuxiliaryFlyAshBag) {
        this.monthDisposalThirdAuxiliaryFlyAshBag = monthDisposalThirdAuxiliaryFlyAshBag;
    }

    public float getMonthDisposalThirdAuxiliaryTonBox() {
        return monthDisposalThirdAuxiliaryTonBox;
    }

    public void setMonthDisposalThirdAuxiliaryTonBox(float monthDisposalThirdAuxiliaryTonBox) {
        this.monthDisposalThirdAuxiliaryTonBox = monthDisposalThirdAuxiliaryTonBox;
    }

    public float getMonthDisposalThirdAuxiliarySteam() {
        return monthDisposalThirdAuxiliarySteam;
    }

    public void setMonthDisposalThirdAuxiliarySteam(float monthDisposalThirdAuxiliarySteam) {
        this.monthDisposalThirdAuxiliarySteam = monthDisposalThirdAuxiliarySteam;
    }

    public float getMonthDisposalThirdAuxiliaryDieselOil() {
        return monthDisposalThirdAuxiliaryDieselOil;
    }

    public void setMonthDisposalThirdAuxiliaryDieselOil(float monthDisposalThirdAuxiliaryDieselOil) {
        this.monthDisposalThirdAuxiliaryDieselOil = monthDisposalThirdAuxiliaryDieselOil;
    }

    public float getMonthDisposalThirdAuxiliaryNaturalGas() {
        return monthDisposalThirdAuxiliaryNaturalGas;
    }

    public void setMonthDisposalThirdAuxiliaryNaturalGas(float monthDisposalThirdAuxiliaryNaturalGas) {
        this.monthDisposalThirdAuxiliaryNaturalGas = monthDisposalThirdAuxiliaryNaturalGas;
    }

    public float getMonthDisposalThirdAuxiliaryIndustrialWater() {
        return monthDisposalThirdAuxiliaryIndustrialWater;
    }

    public void setMonthDisposalThirdAuxiliaryIndustrialWater(float monthDisposalThirdAuxiliaryIndustrialWater) {
        this.monthDisposalThirdAuxiliaryIndustrialWater = monthDisposalThirdAuxiliaryIndustrialWater;
    }

    public float getMonthDisposalThirdAuxiliaryElectricQuantity() {
        return monthDisposalThirdAuxiliaryElectricQuantity;
    }

    public void setMonthDisposalThirdAuxiliaryElectricQuantity(float monthDisposalThirdAuxiliaryElectricQuantity) {
        this.monthDisposalThirdAuxiliaryElectricQuantity = monthDisposalThirdAuxiliaryElectricQuantity;
    }

    public float getMonthDisposalThirdAuxiliaryTapWaterQuantity() {
        return monthDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public void setMonthDisposalThirdAuxiliaryTapWaterQuantity(float monthDisposalThirdAuxiliaryTapWaterQuantity) {
        this.monthDisposalThirdAuxiliaryTapWaterQuantity = monthDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public float getMonthDisposalTowerElectricQuantity() {
        return monthDisposalTowerElectricQuantity;
    }

    public void setMonthDisposalTowerElectricQuantity(float monthDisposalTowerElectricQuantity) {
        this.monthDisposalTowerElectricQuantity = monthDisposalTowerElectricQuantity;
    }

    public float getYearDisposalMedicalAuxiliaryNaclo() {
        return yearDisposalMedicalAuxiliaryNaclo;
    }

    public void setYearDisposalMedicalAuxiliaryNaclo(float yearDisposalMedicalAuxiliaryNaclo) {
        this.yearDisposalMedicalAuxiliaryNaclo = yearDisposalMedicalAuxiliaryNaclo;
    }

    public float getYearDisposalMedicalAuxiliaryDeodorant() {
        return yearDisposalMedicalAuxiliaryDeodorant;
    }

    public void setYearDisposalMedicalAuxiliaryDeodorant(float yearDisposalMedicalAuxiliaryDeodorant) {
        this.yearDisposalMedicalAuxiliaryDeodorant = yearDisposalMedicalAuxiliaryDeodorant;
    }

    public float getYearDisposalMedicalAuxiliaryMedicalWastesBag() {
        return yearDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public void setYearDisposalMedicalAuxiliaryMedicalWastesBag(float yearDisposalMedicalAuxiliaryMedicalWastesBag) {
        this.yearDisposalMedicalAuxiliaryMedicalWastesBag = yearDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public float getYearDisposalMedicalAuxiliaryMedicalPackingPlasticBag() {
        return yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public void setYearDisposalMedicalAuxiliaryMedicalPackingPlasticBag(float yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag) {
        this.yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag = yearDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public float getYearDisposalMedicalAuxiliaryCollectionBox() {
        return yearDisposalMedicalAuxiliaryCollectionBox;
    }

    public void setYearDisposalMedicalAuxiliaryCollectionBox(float yearDisposalMedicalAuxiliaryCollectionBox) {
        this.yearDisposalMedicalAuxiliaryCollectionBox = yearDisposalMedicalAuxiliaryCollectionBox;
    }

    public float getYearDisposalMedicalAuxiliarySteam() {
        return yearDisposalMedicalAuxiliarySteam;
    }

    public void setYearDisposalMedicalAuxiliarySteam(float yearDisposalMedicalAuxiliarySteam) {
        this.yearDisposalMedicalAuxiliarySteam = yearDisposalMedicalAuxiliarySteam;
    }

    public float getYearDisposalMedicalAuxiliaryIndustrialWater() {
        return yearDisposalMedicalAuxiliaryIndustrialWater;
    }

    public void setYearDisposalMedicalAuxiliaryIndustrialWater(float yearDisposalMedicalAuxiliaryIndustrialWater) {
        this.yearDisposalMedicalAuxiliaryIndustrialWater = yearDisposalMedicalAuxiliaryIndustrialWater;
    }

    public float getYearDisposalMedicalAuxiliaryElectricQuantity() {
        return yearDisposalMedicalAuxiliaryElectricQuantity;
    }

    public void setYearDisposalMedicalAuxiliaryElectricQuantity(float yearDisposalMedicalAuxiliaryElectricQuantity) {
        this.yearDisposalMedicalAuxiliaryElectricQuantity = yearDisposalMedicalAuxiliaryElectricQuantity;
    }

    public float getYearDisposalSecondaryAuxiliaryCalcareousLime() {
        return yearDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public void setYearDisposalSecondaryAuxiliaryCalcareousLime(float yearDisposalSecondaryAuxiliaryCalcareousLime) {
        this.yearDisposalSecondaryAuxiliaryCalcareousLime = yearDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public float getYearDisposalSecondaryAuxiliaryCommonActivatedCarbon() {
        return yearDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public void setYearDisposalSecondaryAuxiliaryCommonActivatedCarbon(float yearDisposalSecondaryAuxiliaryCommonActivatedCarbon) {
        this.yearDisposalSecondaryAuxiliaryCommonActivatedCarbon = yearDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public float getYearDisposalSecondaryAuxiliaryActivatedCarbon() {
        return yearDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public void setYearDisposalSecondaryAuxiliaryActivatedCarbon(float yearDisposalSecondaryAuxiliaryActivatedCarbon) {
        this.yearDisposalSecondaryAuxiliaryActivatedCarbon = yearDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public float getYearDisposalSecondaryAuxiliaryActivatedCarbonParticles() {
        return yearDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public void setYearDisposalSecondaryAuxiliaryActivatedCarbonParticles(float yearDisposalSecondaryAuxiliaryActivatedCarbonParticles) {
        this.yearDisposalSecondaryAuxiliaryActivatedCarbonParticles = yearDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public float getYearDisposalSecondaryAuxiliaryLye() {
        return yearDisposalSecondaryAuxiliaryLye;
    }

    public void setYearDisposalSecondaryAuxiliaryLye(float yearDisposalSecondaryAuxiliaryLye) {
        this.yearDisposalSecondaryAuxiliaryLye = yearDisposalSecondaryAuxiliaryLye;
    }

    public float getYearDisposalSecondaryAuxiliarySalt() {
        return yearDisposalSecondaryAuxiliarySalt;
    }

    public void setYearDisposalSecondaryAuxiliarySalt(float yearDisposalSecondaryAuxiliarySalt) {
        this.yearDisposalSecondaryAuxiliarySalt = yearDisposalSecondaryAuxiliarySalt;
    }

    public float getYearDisposalSecondaryAuxiliarySlagBag() {
        return yearDisposalSecondaryAuxiliarySlagBag;
    }

    public void setYearDisposalSecondaryAuxiliarySlagBag(float yearDisposalSecondaryAuxiliarySlagBag) {
        this.yearDisposalSecondaryAuxiliarySlagBag = yearDisposalSecondaryAuxiliarySlagBag;
    }

    public float getYearDisposalSecondaryAuxiliaryFlyAshBag() {
        return yearDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public void setYearDisposalSecondaryAuxiliaryFlyAshBag(float yearDisposalSecondaryAuxiliaryFlyAshBag) {
        this.yearDisposalSecondaryAuxiliaryFlyAshBag = yearDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public float getYearDisposalSecondaryAuxiliaryDieselOil() {
        return yearDisposalSecondaryAuxiliaryDieselOil;
    }

    public void setYearDisposalSecondaryAuxiliaryDieselOil(float yearDisposalSecondaryAuxiliaryDieselOil) {
        this.yearDisposalSecondaryAuxiliaryDieselOil = yearDisposalSecondaryAuxiliaryDieselOil;
    }

    public float getYearDisposalSecondaryAuxiliaryIndustrialWater() {
        return yearDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public void setYearDisposalSecondaryAuxiliaryIndustrialWater(float yearDisposalSecondaryAuxiliaryIndustrialWater) {
        this.yearDisposalSecondaryAuxiliaryIndustrialWater = yearDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public float getYearDisposalSecondaryAuxiliaryElectricQuantity() {
        return yearDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public void setYearDisposalSecondaryAuxiliaryElectricQuantity(float yearDisposalSecondaryAuxiliaryElectricQuantity) {
        this.yearDisposalSecondaryAuxiliaryElectricQuantity = yearDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public float getYearDisposalSecondaryAuxiliaryWoodenPallets() {
        return yearDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public void setYearDisposalSecondaryAuxiliaryWoodenPallets(float yearDisposalSecondaryAuxiliaryWoodenPallets) {
        this.yearDisposalSecondaryAuxiliaryWoodenPallets = yearDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public float getYearDisposalThirdAuxiliaryCalcareousLime() {
        return yearDisposalThirdAuxiliaryCalcareousLime;
    }

    public void setYearDisposalThirdAuxiliaryCalcareousLime(float yearDisposalThirdAuxiliaryCalcareousLime) {
        this.yearDisposalThirdAuxiliaryCalcareousLime = yearDisposalThirdAuxiliaryCalcareousLime;
    }

    public float getYearDisposalThirdAuxiliaryCommonActivatedCarbon() {
        return yearDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public void setYearDisposalThirdAuxiliaryCommonActivatedCarbon(float yearDisposalThirdAuxiliaryCommonActivatedCarbon) {
        this.yearDisposalThirdAuxiliaryCommonActivatedCarbon = yearDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public float getYearDisposalThirdAuxiliaryActivatedCarbon() {
        return yearDisposalThirdAuxiliaryActivatedCarbon;
    }

    public void setYearDisposalThirdAuxiliaryActivatedCarbon(float yearDisposalThirdAuxiliaryActivatedCarbon) {
        this.yearDisposalThirdAuxiliaryActivatedCarbon = yearDisposalThirdAuxiliaryActivatedCarbon;
    }

    public float getYearDisposalThirdAuxiliaryActivatedCarbonParticles() {
        return yearDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public void setYearDisposalThirdAuxiliaryActivatedCarbonParticles(float yearDisposalThirdAuxiliaryActivatedCarbonParticles) {
        this.yearDisposalThirdAuxiliaryActivatedCarbonParticles = yearDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public float getYearDisposalThirdAuxiliaryLye() {
        return yearDisposalThirdAuxiliaryLye;
    }

    public void setYearDisposalThirdAuxiliaryLye(float yearDisposalThirdAuxiliaryLye) {
        this.yearDisposalThirdAuxiliaryLye = yearDisposalThirdAuxiliaryLye;
    }

    public float getYearDisposalThirdAuxiliaryCausticSoda() {
        return yearDisposalThirdAuxiliaryCausticSoda;
    }

    public void setYearDisposalThirdAuxiliaryCausticSoda(float yearDisposalThirdAuxiliaryCausticSoda) {
        this.yearDisposalThirdAuxiliaryCausticSoda = yearDisposalThirdAuxiliaryCausticSoda;
    }

    public float getYearDisposalThirdAuxiliaryUrea() {
        return yearDisposalThirdAuxiliaryUrea;
    }

    public void setYearDisposalThirdAuxiliaryUrea(float yearDisposalThirdAuxiliaryUrea) {
        this.yearDisposalThirdAuxiliaryUrea = yearDisposalThirdAuxiliaryUrea;
    }

    public float getYearDisposalThirdAuxiliaryHydrochloricAcid() {
        return yearDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public void setYearDisposalThirdAuxiliaryHydrochloricAcid(float yearDisposalThirdAuxiliaryHydrochloricAcid) {
        this.yearDisposalThirdAuxiliaryHydrochloricAcid = yearDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public float getYearDisposalThirdAuxiliaryNahco3() {
        return yearDisposalThirdAuxiliaryNahco3;
    }

    public void setYearDisposalThirdAuxiliaryNahco3(float yearDisposalThirdAuxiliaryNahco3) {
        this.yearDisposalThirdAuxiliaryNahco3 = yearDisposalThirdAuxiliaryNahco3;
    }

    public float getYearDisposalThirdAuxiliaryFlour() {
        return yearDisposalThirdAuxiliaryFlour;
    }

    public void setYearDisposalThirdAuxiliaryFlour(float yearDisposalThirdAuxiliaryFlour) {
        this.yearDisposalThirdAuxiliaryFlour = yearDisposalThirdAuxiliaryFlour;
    }

    public float getYearDisposalThirdAuxiliaryDefoamer() {
        return yearDisposalThirdAuxiliaryDefoamer;
    }

    public void setYearDisposalThirdAuxiliaryDefoamer(float yearDisposalThirdAuxiliaryDefoamer) {
        this.yearDisposalThirdAuxiliaryDefoamer = yearDisposalThirdAuxiliaryDefoamer;
    }

    public float getYearDisposalThirdAuxiliaryFlocculant() {
        return yearDisposalThirdAuxiliaryFlocculant;
    }

    public void setYearDisposalThirdAuxiliaryFlocculant(float yearDisposalThirdAuxiliaryFlocculant) {
        this.yearDisposalThirdAuxiliaryFlocculant = yearDisposalThirdAuxiliaryFlocculant;
    }

    public float getYearDisposalThirdAuxiliarySoftWaterReducingAgent() {
        return yearDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public void setYearDisposalThirdAuxiliarySoftWaterReducingAgent(float yearDisposalThirdAuxiliarySoftWaterReducingAgent) {
        this.yearDisposalThirdAuxiliarySoftWaterReducingAgent = yearDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public float getYearDisposalThirdAuxiliarySoftWaterScaleInhibitor() {
        return yearDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public void setYearDisposalThirdAuxiliarySoftWaterScaleInhibitor(float yearDisposalThirdAuxiliarySoftWaterScaleInhibitor) {
        this.yearDisposalThirdAuxiliarySoftWaterScaleInhibitor = yearDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public float getYearDisposalThirdAuxiliaryAmmonia() {
        return yearDisposalThirdAuxiliaryAmmonia;
    }

    public void setYearDisposalThirdAuxiliaryAmmonia(float yearDisposalThirdAuxiliaryAmmonia) {
        this.yearDisposalThirdAuxiliaryAmmonia = yearDisposalThirdAuxiliaryAmmonia;
    }

    public float getYearDisposalThirdAuxiliaryWaterReducingAgent() {
        return yearDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public void setYearDisposalThirdAuxiliaryWaterReducingAgent(float yearDisposalThirdAuxiliaryWaterReducingAgent) {
        this.yearDisposalThirdAuxiliaryWaterReducingAgent = yearDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public float getYearDisposalThirdAuxiliaryWaterScaleInhibitor() {
        return yearDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public void setYearDisposalThirdAuxiliaryWaterScaleInhibitor(float yearDisposalThirdAuxiliaryWaterScaleInhibitor) {
        this.yearDisposalThirdAuxiliaryWaterScaleInhibitor = yearDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public float getYearDisposalThirdAuxiliaryNaclo() {
        return yearDisposalThirdAuxiliaryNaclo;
    }

    public void setYearDisposalThirdAuxiliaryNaclo(float yearDisposalThirdAuxiliaryNaclo) {
        this.yearDisposalThirdAuxiliaryNaclo = yearDisposalThirdAuxiliaryNaclo;
    }

    public float getYearDisposalThirdAuxiliaryStandardBox() {
        return yearDisposalThirdAuxiliaryStandardBox;
    }

    public void setYearDisposalThirdAuxiliaryStandardBox(float yearDisposalThirdAuxiliaryStandardBox) {
        this.yearDisposalThirdAuxiliaryStandardBox = yearDisposalThirdAuxiliaryStandardBox;
    }

    public float getYearDisposalThirdAuxiliaryWoodenPallets() {
        return yearDisposalThirdAuxiliaryWoodenPallets;
    }

    public void setYearDisposalThirdAuxiliaryWoodenPallets(float yearDisposalThirdAuxiliaryWoodenPallets) {
        this.yearDisposalThirdAuxiliaryWoodenPallets = yearDisposalThirdAuxiliaryWoodenPallets;
    }

    public float getYearDisposalThirdAuxiliaryStandardTray_1m() {
        return yearDisposalThirdAuxiliaryStandardTray_1m;
    }

    public void setYearDisposalThirdAuxiliaryStandardTray_1m(float yearDisposalThirdAuxiliaryStandardTray_1m) {
        this.yearDisposalThirdAuxiliaryStandardTray_1m = yearDisposalThirdAuxiliaryStandardTray_1m;
    }

    public float getYearDisposalThirdAuxiliaryStandardTray_1_2m() {
        return yearDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public void setYearDisposalThirdAuxiliaryStandardTray_1_2m(float yearDisposalThirdAuxiliaryStandardTray_1_2m) {
        this.yearDisposalThirdAuxiliaryStandardTray_1_2m = yearDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public float getYearDisposalThirdAuxiliarySlagBag() {
        return yearDisposalThirdAuxiliarySlagBag;
    }

    public void setYearDisposalThirdAuxiliarySlagBag(float yearDisposalThirdAuxiliarySlagBag) {
        this.yearDisposalThirdAuxiliarySlagBag = yearDisposalThirdAuxiliarySlagBag;
    }

    public float getYearDisposalThirdAuxiliaryFlyAshBag() {
        return yearDisposalThirdAuxiliaryFlyAshBag;
    }

    public void setYearDisposalThirdAuxiliaryFlyAshBag(float yearDisposalThirdAuxiliaryFlyAshBag) {
        this.yearDisposalThirdAuxiliaryFlyAshBag = yearDisposalThirdAuxiliaryFlyAshBag;
    }

    public float getYearDisposalThirdAuxiliaryTonBox() {
        return yearDisposalThirdAuxiliaryTonBox;
    }

    public void setYearDisposalThirdAuxiliaryTonBox(float yearDisposalThirdAuxiliaryTonBox) {
        this.yearDisposalThirdAuxiliaryTonBox = yearDisposalThirdAuxiliaryTonBox;
    }

    public float getYearDisposalThirdAuxiliarySteam() {
        return yearDisposalThirdAuxiliarySteam;
    }

    public void setYearDisposalThirdAuxiliarySteam(float yearDisposalThirdAuxiliarySteam) {
        this.yearDisposalThirdAuxiliarySteam = yearDisposalThirdAuxiliarySteam;
    }

    public float getYearDisposalThirdAuxiliaryDieselOil() {
        return yearDisposalThirdAuxiliaryDieselOil;
    }

    public void setYearDisposalThirdAuxiliaryDieselOil(float yearDisposalThirdAuxiliaryDieselOil) {
        this.yearDisposalThirdAuxiliaryDieselOil = yearDisposalThirdAuxiliaryDieselOil;
    }

    public float getYearDisposalThirdAuxiliaryNaturalGas() {
        return yearDisposalThirdAuxiliaryNaturalGas;
    }

    public void setYearDisposalThirdAuxiliaryNaturalGas(float yearDisposalThirdAuxiliaryNaturalGas) {
        this.yearDisposalThirdAuxiliaryNaturalGas = yearDisposalThirdAuxiliaryNaturalGas;
    }

    public float getYearDisposalThirdAuxiliaryIndustrialWater() {
        return yearDisposalThirdAuxiliaryIndustrialWater;
    }

    public void setYearDisposalThirdAuxiliaryIndustrialWater(float yearDisposalThirdAuxiliaryIndustrialWater) {
        this.yearDisposalThirdAuxiliaryIndustrialWater = yearDisposalThirdAuxiliaryIndustrialWater;
    }

    public float getYearDisposalThirdAuxiliaryElectricQuantity() {
        return yearDisposalThirdAuxiliaryElectricQuantity;
    }

    public void setYearDisposalThirdAuxiliaryElectricQuantity(float yearDisposalThirdAuxiliaryElectricQuantity) {
        this.yearDisposalThirdAuxiliaryElectricQuantity = yearDisposalThirdAuxiliaryElectricQuantity;
    }

    public float getYearDisposalThirdAuxiliaryTapWaterQuantity() {
        return yearDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public void setYearDisposalThirdAuxiliaryTapWaterQuantity(float yearDisposalThirdAuxiliaryTapWaterQuantity) {
        this.yearDisposalThirdAuxiliaryTapWaterQuantity = yearDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public float getYearDisposalTowerElectricQuantity() {
        return yearDisposalTowerElectricQuantity;
    }

    public void setYearDisposalTowerElectricQuantity(float yearDisposalTowerElectricQuantity) {
        this.yearDisposalTowerElectricQuantity = yearDisposalTowerElectricQuantity;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryNaclo() {
        return todayAverageDisposalMedicalAuxiliaryNaclo;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryNaclo(float todayAverageDisposalMedicalAuxiliaryNaclo) {
        this.todayAverageDisposalMedicalAuxiliaryNaclo = todayAverageDisposalMedicalAuxiliaryNaclo;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryDeodorant() {
        return todayAverageDisposalMedicalAuxiliaryDeodorant;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryDeodorant(float todayAverageDisposalMedicalAuxiliaryDeodorant) {
        this.todayAverageDisposalMedicalAuxiliaryDeodorant = todayAverageDisposalMedicalAuxiliaryDeodorant;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryMedicalWastesBag() {
        return todayAverageDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryMedicalWastesBag(float todayAverageDisposalMedicalAuxiliaryMedicalWastesBag) {
        this.todayAverageDisposalMedicalAuxiliaryMedicalWastesBag = todayAverageDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag() {
        return todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag(float todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag) {
        this.todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag = todayAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryCollectionBox() {
        return todayAverageDisposalMedicalAuxiliaryCollectionBox;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryCollectionBox(float todayAverageDisposalMedicalAuxiliaryCollectionBox) {
        this.todayAverageDisposalMedicalAuxiliaryCollectionBox = todayAverageDisposalMedicalAuxiliaryCollectionBox;
    }

    public float getTodayAverageDisposalMedicalAuxiliarySteam() {
        return todayAverageDisposalMedicalAuxiliarySteam;
    }

    public void setTodayAverageDisposalMedicalAuxiliarySteam(float todayAverageDisposalMedicalAuxiliarySteam) {
        this.todayAverageDisposalMedicalAuxiliarySteam = todayAverageDisposalMedicalAuxiliarySteam;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryIndustrialWater() {
        return todayAverageDisposalMedicalAuxiliaryIndustrialWater;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryIndustrialWater(float todayAverageDisposalMedicalAuxiliaryIndustrialWater) {
        this.todayAverageDisposalMedicalAuxiliaryIndustrialWater = todayAverageDisposalMedicalAuxiliaryIndustrialWater;
    }

    public float getTodayAverageDisposalMedicalAuxiliaryElectricQuantity() {
        return todayAverageDisposalMedicalAuxiliaryElectricQuantity;
    }

    public void setTodayAverageDisposalMedicalAuxiliaryElectricQuantity(float todayAverageDisposalMedicalAuxiliaryElectricQuantity) {
        this.todayAverageDisposalMedicalAuxiliaryElectricQuantity = todayAverageDisposalMedicalAuxiliaryElectricQuantity;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryCalcareousLime() {
        return todayAverageDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryCalcareousLime(float todayAverageDisposalSecondaryAuxiliaryCalcareousLime) {
        this.todayAverageDisposalSecondaryAuxiliaryCalcareousLime = todayAverageDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon() {
        return todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon(float todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon) {
        this.todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon = todayAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryActivatedCarbon() {
        return todayAverageDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryActivatedCarbon(float todayAverageDisposalSecondaryAuxiliaryActivatedCarbon) {
        this.todayAverageDisposalSecondaryAuxiliaryActivatedCarbon = todayAverageDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles() {
        return todayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles(float todayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles) {
        this.todayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles = todayAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryLye() {
        return todayAverageDisposalSecondaryAuxiliaryLye;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryLye(float todayAverageDisposalSecondaryAuxiliaryLye) {
        this.todayAverageDisposalSecondaryAuxiliaryLye = todayAverageDisposalSecondaryAuxiliaryLye;
    }

    public float getTodayAverageDisposalSecondaryAuxiliarySalt() {
        return todayAverageDisposalSecondaryAuxiliarySalt;
    }

    public void setTodayAverageDisposalSecondaryAuxiliarySalt(float todayAverageDisposalSecondaryAuxiliarySalt) {
        this.todayAverageDisposalSecondaryAuxiliarySalt = todayAverageDisposalSecondaryAuxiliarySalt;
    }

    public float getTodayAverageDisposalSecondaryAuxiliarySlagBag() {
        return todayAverageDisposalSecondaryAuxiliarySlagBag;
    }

    public void setTodayAverageDisposalSecondaryAuxiliarySlagBag(float todayAverageDisposalSecondaryAuxiliarySlagBag) {
        this.todayAverageDisposalSecondaryAuxiliarySlagBag = todayAverageDisposalSecondaryAuxiliarySlagBag;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryFlyAshBag() {
        return todayAverageDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryFlyAshBag(float todayAverageDisposalSecondaryAuxiliaryFlyAshBag) {
        this.todayAverageDisposalSecondaryAuxiliaryFlyAshBag = todayAverageDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryDieselOil() {
        return todayAverageDisposalSecondaryAuxiliaryDieselOil;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryDieselOil(float todayAverageDisposalSecondaryAuxiliaryDieselOil) {
        this.todayAverageDisposalSecondaryAuxiliaryDieselOil = todayAverageDisposalSecondaryAuxiliaryDieselOil;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryIndustrialWater() {
        return todayAverageDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryIndustrialWater(float todayAverageDisposalSecondaryAuxiliaryIndustrialWater) {
        this.todayAverageDisposalSecondaryAuxiliaryIndustrialWater = todayAverageDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryElectricQuantity() {
        return todayAverageDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryElectricQuantity(float todayAverageDisposalSecondaryAuxiliaryElectricQuantity) {
        this.todayAverageDisposalSecondaryAuxiliaryElectricQuantity = todayAverageDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public float getTodayAverageDisposalSecondaryAuxiliaryWoodenPallets() {
        return todayAverageDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public void setTodayAverageDisposalSecondaryAuxiliaryWoodenPallets(float todayAverageDisposalSecondaryAuxiliaryWoodenPallets) {
        this.todayAverageDisposalSecondaryAuxiliaryWoodenPallets = todayAverageDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public float getTodayAverageDisposalThirdAuxiliaryCalcareousLime() {
        return todayAverageDisposalThirdAuxiliaryCalcareousLime;
    }

    public void setTodayAverageDisposalThirdAuxiliaryCalcareousLime(float todayAverageDisposalThirdAuxiliaryCalcareousLime) {
        this.todayAverageDisposalThirdAuxiliaryCalcareousLime = todayAverageDisposalThirdAuxiliaryCalcareousLime;
    }

    public float getTodayAverageDisposalThirdAuxiliaryCommonActivatedCarbon() {
        return todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public void setTodayAverageDisposalThirdAuxiliaryCommonActivatedCarbon(float todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon) {
        this.todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon = todayAverageDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public float getTodayAverageDisposalThirdAuxiliaryActivatedCarbon() {
        return todayAverageDisposalThirdAuxiliaryActivatedCarbon;
    }

    public void setTodayAverageDisposalThirdAuxiliaryActivatedCarbon(float todayAverageDisposalThirdAuxiliaryActivatedCarbon) {
        this.todayAverageDisposalThirdAuxiliaryActivatedCarbon = todayAverageDisposalThirdAuxiliaryActivatedCarbon;
    }

    public float getTodayAverageDisposalThirdAuxiliaryActivatedCarbonParticles() {
        return todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public void setTodayAverageDisposalThirdAuxiliaryActivatedCarbonParticles(float todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles) {
        this.todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles = todayAverageDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public float getTodayAverageDisposalThirdAuxiliaryLye() {
        return todayAverageDisposalThirdAuxiliaryLye;
    }

    public void setTodayAverageDisposalThirdAuxiliaryLye(float todayAverageDisposalThirdAuxiliaryLye) {
        this.todayAverageDisposalThirdAuxiliaryLye = todayAverageDisposalThirdAuxiliaryLye;
    }

    public float getTodayAverageDisposalThirdAuxiliaryCausticSoda() {
        return todayAverageDisposalThirdAuxiliaryCausticSoda;
    }

    public void setTodayAverageDisposalThirdAuxiliaryCausticSoda(float todayAverageDisposalThirdAuxiliaryCausticSoda) {
        this.todayAverageDisposalThirdAuxiliaryCausticSoda = todayAverageDisposalThirdAuxiliaryCausticSoda;
    }

    public float getTodayAverageDisposalThirdAuxiliaryUrea() {
        return todayAverageDisposalThirdAuxiliaryUrea;
    }

    public void setTodayAverageDisposalThirdAuxiliaryUrea(float todayAverageDisposalThirdAuxiliaryUrea) {
        this.todayAverageDisposalThirdAuxiliaryUrea = todayAverageDisposalThirdAuxiliaryUrea;
    }

    public float getTodayAverageDisposalThirdAuxiliaryHydrochloricAcid() {
        return todayAverageDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public void setTodayAverageDisposalThirdAuxiliaryHydrochloricAcid(float todayAverageDisposalThirdAuxiliaryHydrochloricAcid) {
        this.todayAverageDisposalThirdAuxiliaryHydrochloricAcid = todayAverageDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public float getTodayAverageDisposalThirdAuxiliaryNahco3() {
        return todayAverageDisposalThirdAuxiliaryNahco3;
    }

    public void setTodayAverageDisposalThirdAuxiliaryNahco3(float todayAverageDisposalThirdAuxiliaryNahco3) {
        this.todayAverageDisposalThirdAuxiliaryNahco3 = todayAverageDisposalThirdAuxiliaryNahco3;
    }

    public float getTodayAverageDisposalThirdAuxiliaryFlour() {
        return todayAverageDisposalThirdAuxiliaryFlour;
    }

    public void setTodayAverageDisposalThirdAuxiliaryFlour(float todayAverageDisposalThirdAuxiliaryFlour) {
        this.todayAverageDisposalThirdAuxiliaryFlour = todayAverageDisposalThirdAuxiliaryFlour;
    }

    public float getTodayAverageDisposalThirdAuxiliaryDefoamer() {
        return todayAverageDisposalThirdAuxiliaryDefoamer;
    }

    public void setTodayAverageDisposalThirdAuxiliaryDefoamer(float todayAverageDisposalThirdAuxiliaryDefoamer) {
        this.todayAverageDisposalThirdAuxiliaryDefoamer = todayAverageDisposalThirdAuxiliaryDefoamer;
    }

    public float getTodayAverageDisposalThirdAuxiliaryFlocculant() {
        return todayAverageDisposalThirdAuxiliaryFlocculant;
    }

    public void setTodayAverageDisposalThirdAuxiliaryFlocculant(float todayAverageDisposalThirdAuxiliaryFlocculant) {
        this.todayAverageDisposalThirdAuxiliaryFlocculant = todayAverageDisposalThirdAuxiliaryFlocculant;
    }

    public float getTodayAverageDisposalThirdAuxiliarySoftWaterReducingAgent() {
        return todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public void setTodayAverageDisposalThirdAuxiliarySoftWaterReducingAgent(float todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent) {
        this.todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent = todayAverageDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public float getTodayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor() {
        return todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public void setTodayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor(float todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor) {
        this.todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor = todayAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public float getTodayAverageDisposalThirdAuxiliaryAmmonia() {
        return todayAverageDisposalThirdAuxiliaryAmmonia;
    }

    public void setTodayAverageDisposalThirdAuxiliaryAmmonia(float todayAverageDisposalThirdAuxiliaryAmmonia) {
        this.todayAverageDisposalThirdAuxiliaryAmmonia = todayAverageDisposalThirdAuxiliaryAmmonia;
    }

    public float getTodayAverageDisposalThirdAuxiliaryWaterReducingAgent() {
        return todayAverageDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public void setTodayAverageDisposalThirdAuxiliaryWaterReducingAgent(float todayAverageDisposalThirdAuxiliaryWaterReducingAgent) {
        this.todayAverageDisposalThirdAuxiliaryWaterReducingAgent = todayAverageDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public float getTodayAverageDisposalThirdAuxiliaryWaterScaleInhibitor() {
        return todayAverageDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public void setTodayAverageDisposalThirdAuxiliaryWaterScaleInhibitor(float todayAverageDisposalThirdAuxiliaryWaterScaleInhibitor) {
        this.todayAverageDisposalThirdAuxiliaryWaterScaleInhibitor = todayAverageDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public float getTodayAverageDisposalThirdAuxiliaryNaclo() {
        return todayAverageDisposalThirdAuxiliaryNaclo;
    }

    public void setTodayAverageDisposalThirdAuxiliaryNaclo(float todayAverageDisposalThirdAuxiliaryNaclo) {
        this.todayAverageDisposalThirdAuxiliaryNaclo = todayAverageDisposalThirdAuxiliaryNaclo;
    }

    public float getTodayAverageDisposalThirdAuxiliaryStandardBox() {
        return todayAverageDisposalThirdAuxiliaryStandardBox;
    }

    public void setTodayAverageDisposalThirdAuxiliaryStandardBox(float todayAverageDisposalThirdAuxiliaryStandardBox) {
        this.todayAverageDisposalThirdAuxiliaryStandardBox = todayAverageDisposalThirdAuxiliaryStandardBox;
    }

    public float getTodayAverageDisposalThirdAuxiliaryWoodenPallets() {
        return todayAverageDisposalThirdAuxiliaryWoodenPallets;
    }

    public void setTodayAverageDisposalThirdAuxiliaryWoodenPallets(float todayAverageDisposalThirdAuxiliaryWoodenPallets) {
        this.todayAverageDisposalThirdAuxiliaryWoodenPallets = todayAverageDisposalThirdAuxiliaryWoodenPallets;
    }

    public float getTodayAverageDisposalThirdAuxiliaryStandardTray_1m() {
        return todayAverageDisposalThirdAuxiliaryStandardTray_1m;
    }

    public void setTodayAverageDisposalThirdAuxiliaryStandardTray_1m(float todayAverageDisposalThirdAuxiliaryStandardTray_1m) {
        this.todayAverageDisposalThirdAuxiliaryStandardTray_1m = todayAverageDisposalThirdAuxiliaryStandardTray_1m;
    }

    public float getTodayAverageDisposalThirdAuxiliaryStandardTray_1_2m() {
        return todayAverageDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public void setTodayAverageDisposalThirdAuxiliaryStandardTray_1_2m(float todayAverageDisposalThirdAuxiliaryStandardTray_1_2m) {
        this.todayAverageDisposalThirdAuxiliaryStandardTray_1_2m = todayAverageDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public float getTodayAverageDisposalThirdAuxiliarySlagBag() {
        return todayAverageDisposalThirdAuxiliarySlagBag;
    }

    public void setTodayAverageDisposalThirdAuxiliarySlagBag(float todayAverageDisposalThirdAuxiliarySlagBag) {
        this.todayAverageDisposalThirdAuxiliarySlagBag = todayAverageDisposalThirdAuxiliarySlagBag;
    }

    public float getTodayAverageDisposalThirdAuxiliaryFlyAshBag() {
        return todayAverageDisposalThirdAuxiliaryFlyAshBag;
    }

    public void setTodayAverageDisposalThirdAuxiliaryFlyAshBag(float todayAverageDisposalThirdAuxiliaryFlyAshBag) {
        this.todayAverageDisposalThirdAuxiliaryFlyAshBag = todayAverageDisposalThirdAuxiliaryFlyAshBag;
    }

    public float getTodayAverageDisposalThirdAuxiliaryTonBox() {
        return todayAverageDisposalThirdAuxiliaryTonBox;
    }

    public void setTodayAverageDisposalThirdAuxiliaryTonBox(float todayAverageDisposalThirdAuxiliaryTonBox) {
        this.todayAverageDisposalThirdAuxiliaryTonBox = todayAverageDisposalThirdAuxiliaryTonBox;
    }

    public float getTodayAverageDisposalThirdAuxiliarySteam() {
        return todayAverageDisposalThirdAuxiliarySteam;
    }

    public void setTodayAverageDisposalThirdAuxiliarySteam(float todayAverageDisposalThirdAuxiliarySteam) {
        this.todayAverageDisposalThirdAuxiliarySteam = todayAverageDisposalThirdAuxiliarySteam;
    }

    public float getTodayAverageDisposalThirdAuxiliaryDieselOil() {
        return todayAverageDisposalThirdAuxiliaryDieselOil;
    }

    public void setTodayAverageDisposalThirdAuxiliaryDieselOil(float todayAverageDisposalThirdAuxiliaryDieselOil) {
        this.todayAverageDisposalThirdAuxiliaryDieselOil = todayAverageDisposalThirdAuxiliaryDieselOil;
    }

    public float getTodayAverageDisposalThirdAuxiliaryNaturalGas() {
        return todayAverageDisposalThirdAuxiliaryNaturalGas;
    }

    public void setTodayAverageDisposalThirdAuxiliaryNaturalGas(float todayAverageDisposalThirdAuxiliaryNaturalGas) {
        this.todayAverageDisposalThirdAuxiliaryNaturalGas = todayAverageDisposalThirdAuxiliaryNaturalGas;
    }

    public float getTodayAverageDisposalThirdAuxiliaryIndustrialWater() {
        return todayAverageDisposalThirdAuxiliaryIndustrialWater;
    }

    public void setTodayAverageDisposalThirdAuxiliaryIndustrialWater(float todayAverageDisposalThirdAuxiliaryIndustrialWater) {
        this.todayAverageDisposalThirdAuxiliaryIndustrialWater = todayAverageDisposalThirdAuxiliaryIndustrialWater;
    }

    public float getTodayAverageDisposalThirdAuxiliaryElectricQuantity() {
        return todayAverageDisposalThirdAuxiliaryElectricQuantity;
    }

    public void setTodayAverageDisposalThirdAuxiliaryElectricQuantity(float todayAverageDisposalThirdAuxiliaryElectricQuantity) {
        this.todayAverageDisposalThirdAuxiliaryElectricQuantity = todayAverageDisposalThirdAuxiliaryElectricQuantity;
    }

    public float getTodayAverageDisposalThirdAuxiliaryTapWaterQuantity() {
        return todayAverageDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public void setTodayAverageDisposalThirdAuxiliaryTapWaterQuantity(float todayAverageDisposalThirdAuxiliaryTapWaterQuantity) {
        this.todayAverageDisposalThirdAuxiliaryTapWaterQuantity = todayAverageDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public float getTodayAverageDisposalTowerElectricQuantity() {
        return todayAverageDisposalTowerElectricQuantity;
    }

    public void setTodayAverageDisposalTowerElectricQuantity(float todayAverageDisposalTowerElectricQuantity) {
        this.todayAverageDisposalTowerElectricQuantity = todayAverageDisposalTowerElectricQuantity;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryNaclo() {
        return monthAverageDisposalMedicalAuxiliaryNaclo;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryNaclo(float monthAverageDisposalMedicalAuxiliaryNaclo) {
        this.monthAverageDisposalMedicalAuxiliaryNaclo = monthAverageDisposalMedicalAuxiliaryNaclo;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryDeodorant() {
        return monthAverageDisposalMedicalAuxiliaryDeodorant;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryDeodorant(float monthAverageDisposalMedicalAuxiliaryDeodorant) {
        this.monthAverageDisposalMedicalAuxiliaryDeodorant = monthAverageDisposalMedicalAuxiliaryDeodorant;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryMedicalWastesBag() {
        return monthAverageDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryMedicalWastesBag(float monthAverageDisposalMedicalAuxiliaryMedicalWastesBag) {
        this.monthAverageDisposalMedicalAuxiliaryMedicalWastesBag = monthAverageDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag() {
        return monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag(float monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag) {
        this.monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag = monthAverageDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryCollectionBox() {
        return monthAverageDisposalMedicalAuxiliaryCollectionBox;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryCollectionBox(float monthAverageDisposalMedicalAuxiliaryCollectionBox) {
        this.monthAverageDisposalMedicalAuxiliaryCollectionBox = monthAverageDisposalMedicalAuxiliaryCollectionBox;
    }

    public float getMonthAverageDisposalMedicalAuxiliarySteam() {
        return monthAverageDisposalMedicalAuxiliarySteam;
    }

    public void setMonthAverageDisposalMedicalAuxiliarySteam(float monthAverageDisposalMedicalAuxiliarySteam) {
        this.monthAverageDisposalMedicalAuxiliarySteam = monthAverageDisposalMedicalAuxiliarySteam;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryIndustrialWater() {
        return monthAverageDisposalMedicalAuxiliaryIndustrialWater;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryIndustrialWater(float monthAverageDisposalMedicalAuxiliaryIndustrialWater) {
        this.monthAverageDisposalMedicalAuxiliaryIndustrialWater = monthAverageDisposalMedicalAuxiliaryIndustrialWater;
    }

    public float getMonthAverageDisposalMedicalAuxiliaryElectricQuantity() {
        return monthAverageDisposalMedicalAuxiliaryElectricQuantity;
    }

    public void setMonthAverageDisposalMedicalAuxiliaryElectricQuantity(float monthAverageDisposalMedicalAuxiliaryElectricQuantity) {
        this.monthAverageDisposalMedicalAuxiliaryElectricQuantity = monthAverageDisposalMedicalAuxiliaryElectricQuantity;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryCalcareousLime() {
        return monthAverageDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryCalcareousLime(float monthAverageDisposalSecondaryAuxiliaryCalcareousLime) {
        this.monthAverageDisposalSecondaryAuxiliaryCalcareousLime = monthAverageDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon() {
        return monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon(float monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon) {
        this.monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon = monthAverageDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryActivatedCarbon() {
        return monthAverageDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryActivatedCarbon(float monthAverageDisposalSecondaryAuxiliaryActivatedCarbon) {
        this.monthAverageDisposalSecondaryAuxiliaryActivatedCarbon = monthAverageDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles() {
        return monthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles(float monthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles) {
        this.monthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles = monthAverageDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryLye() {
        return monthAverageDisposalSecondaryAuxiliaryLye;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryLye(float monthAverageDisposalSecondaryAuxiliaryLye) {
        this.monthAverageDisposalSecondaryAuxiliaryLye = monthAverageDisposalSecondaryAuxiliaryLye;
    }

    public float getMonthAverageDisposalSecondaryAuxiliarySalt() {
        return monthAverageDisposalSecondaryAuxiliarySalt;
    }

    public void setMonthAverageDisposalSecondaryAuxiliarySalt(float monthAverageDisposalSecondaryAuxiliarySalt) {
        this.monthAverageDisposalSecondaryAuxiliarySalt = monthAverageDisposalSecondaryAuxiliarySalt;
    }

    public float getMonthAverageDisposalSecondaryAuxiliarySlagBag() {
        return monthAverageDisposalSecondaryAuxiliarySlagBag;
    }

    public void setMonthAverageDisposalSecondaryAuxiliarySlagBag(float monthAverageDisposalSecondaryAuxiliarySlagBag) {
        this.monthAverageDisposalSecondaryAuxiliarySlagBag = monthAverageDisposalSecondaryAuxiliarySlagBag;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryFlyAshBag() {
        return monthAverageDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryFlyAshBag(float monthAverageDisposalSecondaryAuxiliaryFlyAshBag) {
        this.monthAverageDisposalSecondaryAuxiliaryFlyAshBag = monthAverageDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryDieselOil() {
        return monthAverageDisposalSecondaryAuxiliaryDieselOil;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryDieselOil(float monthAverageDisposalSecondaryAuxiliaryDieselOil) {
        this.monthAverageDisposalSecondaryAuxiliaryDieselOil = monthAverageDisposalSecondaryAuxiliaryDieselOil;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryIndustrialWater() {
        return monthAverageDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryIndustrialWater(float monthAverageDisposalSecondaryAuxiliaryIndustrialWater) {
        this.monthAverageDisposalSecondaryAuxiliaryIndustrialWater = monthAverageDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryElectricQuantity() {
        return monthAverageDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryElectricQuantity(float monthAverageDisposalSecondaryAuxiliaryElectricQuantity) {
        this.monthAverageDisposalSecondaryAuxiliaryElectricQuantity = monthAverageDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public float getMonthAverageDisposalSecondaryAuxiliaryWoodenPallets() {
        return monthAverageDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public void setMonthAverageDisposalSecondaryAuxiliaryWoodenPallets(float monthAverageDisposalSecondaryAuxiliaryWoodenPallets) {
        this.monthAverageDisposalSecondaryAuxiliaryWoodenPallets = monthAverageDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public float getMonthAverageDisposalThirdAuxiliaryCalcareousLime() {
        return monthAverageDisposalThirdAuxiliaryCalcareousLime;
    }

    public void setMonthAverageDisposalThirdAuxiliaryCalcareousLime(float monthAverageDisposalThirdAuxiliaryCalcareousLime) {
        this.monthAverageDisposalThirdAuxiliaryCalcareousLime = monthAverageDisposalThirdAuxiliaryCalcareousLime;
    }

    public float getMonthAverageDisposalThirdAuxiliaryCommonActivatedCarbon() {
        return monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public void setMonthAverageDisposalThirdAuxiliaryCommonActivatedCarbon(float monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon) {
        this.monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon = monthAverageDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public float getMonthAverageDisposalThirdAuxiliaryActivatedCarbon() {
        return monthAverageDisposalThirdAuxiliaryActivatedCarbon;
    }

    public void setMonthAverageDisposalThirdAuxiliaryActivatedCarbon(float monthAverageDisposalThirdAuxiliaryActivatedCarbon) {
        this.monthAverageDisposalThirdAuxiliaryActivatedCarbon = monthAverageDisposalThirdAuxiliaryActivatedCarbon;
    }

    public float getMonthAverageDisposalThirdAuxiliaryActivatedCarbonParticles() {
        return monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public void setMonthAverageDisposalThirdAuxiliaryActivatedCarbonParticles(float monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles) {
        this.monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles = monthAverageDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public float getMonthAverageDisposalThirdAuxiliaryLye() {
        return monthAverageDisposalThirdAuxiliaryLye;
    }

    public void setMonthAverageDisposalThirdAuxiliaryLye(float monthAverageDisposalThirdAuxiliaryLye) {
        this.monthAverageDisposalThirdAuxiliaryLye = monthAverageDisposalThirdAuxiliaryLye;
    }

    public float getMonthAverageDisposalThirdAuxiliaryCausticSoda() {
        return monthAverageDisposalThirdAuxiliaryCausticSoda;
    }

    public void setMonthAverageDisposalThirdAuxiliaryCausticSoda(float monthAverageDisposalThirdAuxiliaryCausticSoda) {
        this.monthAverageDisposalThirdAuxiliaryCausticSoda = monthAverageDisposalThirdAuxiliaryCausticSoda;
    }

    public float getMonthAverageDisposalThirdAuxiliaryUrea() {
        return monthAverageDisposalThirdAuxiliaryUrea;
    }

    public void setMonthAverageDisposalThirdAuxiliaryUrea(float monthAverageDisposalThirdAuxiliaryUrea) {
        this.monthAverageDisposalThirdAuxiliaryUrea = monthAverageDisposalThirdAuxiliaryUrea;
    }

    public float getMonthAverageDisposalThirdAuxiliaryHydrochloricAcid() {
        return monthAverageDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public void setMonthAverageDisposalThirdAuxiliaryHydrochloricAcid(float monthAverageDisposalThirdAuxiliaryHydrochloricAcid) {
        this.monthAverageDisposalThirdAuxiliaryHydrochloricAcid = monthAverageDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public float getMonthAverageDisposalThirdAuxiliaryNahco3() {
        return monthAverageDisposalThirdAuxiliaryNahco3;
    }

    public void setMonthAverageDisposalThirdAuxiliaryNahco3(float monthAverageDisposalThirdAuxiliaryNahco3) {
        this.monthAverageDisposalThirdAuxiliaryNahco3 = monthAverageDisposalThirdAuxiliaryNahco3;
    }

    public float getMonthAverageDisposalThirdAuxiliaryFlour() {
        return monthAverageDisposalThirdAuxiliaryFlour;
    }

    public void setMonthAverageDisposalThirdAuxiliaryFlour(float monthAverageDisposalThirdAuxiliaryFlour) {
        this.monthAverageDisposalThirdAuxiliaryFlour = monthAverageDisposalThirdAuxiliaryFlour;
    }

    public float getMonthAverageDisposalThirdAuxiliaryDefoamer() {
        return monthAverageDisposalThirdAuxiliaryDefoamer;
    }

    public void setMonthAverageDisposalThirdAuxiliaryDefoamer(float monthAverageDisposalThirdAuxiliaryDefoamer) {
        this.monthAverageDisposalThirdAuxiliaryDefoamer = monthAverageDisposalThirdAuxiliaryDefoamer;
    }

    public float getMonthAverageDisposalThirdAuxiliaryFlocculant() {
        return monthAverageDisposalThirdAuxiliaryFlocculant;
    }

    public void setMonthAverageDisposalThirdAuxiliaryFlocculant(float monthAverageDisposalThirdAuxiliaryFlocculant) {
        this.monthAverageDisposalThirdAuxiliaryFlocculant = monthAverageDisposalThirdAuxiliaryFlocculant;
    }

    public float getMonthAverageDisposalThirdAuxiliarySoftWaterReducingAgent() {
        return monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public void setMonthAverageDisposalThirdAuxiliarySoftWaterReducingAgent(float monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent) {
        this.monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent = monthAverageDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public float getMonthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor() {
        return monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public void setMonthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor(float monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor) {
        this.monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor = monthAverageDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public float getMonthAverageDisposalThirdAuxiliaryAmmonia() {
        return monthAverageDisposalThirdAuxiliaryAmmonia;
    }

    public void setMonthAverageDisposalThirdAuxiliaryAmmonia(float monthAverageDisposalThirdAuxiliaryAmmonia) {
        this.monthAverageDisposalThirdAuxiliaryAmmonia = monthAverageDisposalThirdAuxiliaryAmmonia;
    }

    public float getMonthAverageDisposalThirdAuxiliaryWaterReducingAgent() {
        return monthAverageDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public void setMonthAverageDisposalThirdAuxiliaryWaterReducingAgent(float monthAverageDisposalThirdAuxiliaryWaterReducingAgent) {
        this.monthAverageDisposalThirdAuxiliaryWaterReducingAgent = monthAverageDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public float getMonthAverageDisposalThirdAuxiliaryWaterScaleInhibitor() {
        return monthAverageDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public void setMonthAverageDisposalThirdAuxiliaryWaterScaleInhibitor(float monthAverageDisposalThirdAuxiliaryWaterScaleInhibitor) {
        this.monthAverageDisposalThirdAuxiliaryWaterScaleInhibitor = monthAverageDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public float getMonthAverageDisposalThirdAuxiliaryNaclo() {
        return monthAverageDisposalThirdAuxiliaryNaclo;
    }

    public void setMonthAverageDisposalThirdAuxiliaryNaclo(float monthAverageDisposalThirdAuxiliaryNaclo) {
        this.monthAverageDisposalThirdAuxiliaryNaclo = monthAverageDisposalThirdAuxiliaryNaclo;
    }

    public float getMonthAverageDisposalThirdAuxiliaryStandardBox() {
        return monthAverageDisposalThirdAuxiliaryStandardBox;
    }

    public void setMonthAverageDisposalThirdAuxiliaryStandardBox(float monthAverageDisposalThirdAuxiliaryStandardBox) {
        this.monthAverageDisposalThirdAuxiliaryStandardBox = monthAverageDisposalThirdAuxiliaryStandardBox;
    }

    public float getMonthAverageDisposalThirdAuxiliaryWoodenPallets() {
        return monthAverageDisposalThirdAuxiliaryWoodenPallets;
    }

    public void setMonthAverageDisposalThirdAuxiliaryWoodenPallets(float monthAverageDisposalThirdAuxiliaryWoodenPallets) {
        this.monthAverageDisposalThirdAuxiliaryWoodenPallets = monthAverageDisposalThirdAuxiliaryWoodenPallets;
    }

    public float getMonthAverageDisposalThirdAuxiliaryStandardTray_1m() {
        return monthAverageDisposalThirdAuxiliaryStandardTray_1m;
    }

    public void setMonthAverageDisposalThirdAuxiliaryStandardTray_1m(float monthAverageDisposalThirdAuxiliaryStandardTray_1m) {
        this.monthAverageDisposalThirdAuxiliaryStandardTray_1m = monthAverageDisposalThirdAuxiliaryStandardTray_1m;
    }

    public float getMonthAverageDisposalThirdAuxiliaryStandardTray_1_2m() {
        return monthAverageDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public void setMonthAverageDisposalThirdAuxiliaryStandardTray_1_2m(float monthAverageDisposalThirdAuxiliaryStandardTray_1_2m) {
        this.monthAverageDisposalThirdAuxiliaryStandardTray_1_2m = monthAverageDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public float getMonthAverageDisposalThirdAuxiliarySlagBag() {
        return monthAverageDisposalThirdAuxiliarySlagBag;
    }

    public void setMonthAverageDisposalThirdAuxiliarySlagBag(float monthAverageDisposalThirdAuxiliarySlagBag) {
        this.monthAverageDisposalThirdAuxiliarySlagBag = monthAverageDisposalThirdAuxiliarySlagBag;
    }

    public float getMonthAverageDisposalThirdAuxiliaryFlyAshBag() {
        return monthAverageDisposalThirdAuxiliaryFlyAshBag;
    }

    public void setMonthAverageDisposalThirdAuxiliaryFlyAshBag(float monthAverageDisposalThirdAuxiliaryFlyAshBag) {
        this.monthAverageDisposalThirdAuxiliaryFlyAshBag = monthAverageDisposalThirdAuxiliaryFlyAshBag;
    }

    public float getMonthAverageDisposalThirdAuxiliaryTonBox() {
        return monthAverageDisposalThirdAuxiliaryTonBox;
    }

    public void setMonthAverageDisposalThirdAuxiliaryTonBox(float monthAverageDisposalThirdAuxiliaryTonBox) {
        this.monthAverageDisposalThirdAuxiliaryTonBox = monthAverageDisposalThirdAuxiliaryTonBox;
    }

    public float getMonthAverageDisposalThirdAuxiliarySteam() {
        return monthAverageDisposalThirdAuxiliarySteam;
    }

    public void setMonthAverageDisposalThirdAuxiliarySteam(float monthAverageDisposalThirdAuxiliarySteam) {
        this.monthAverageDisposalThirdAuxiliarySteam = monthAverageDisposalThirdAuxiliarySteam;
    }

    public float getMonthAverageDisposalThirdAuxiliaryDieselOil() {
        return monthAverageDisposalThirdAuxiliaryDieselOil;
    }

    public void setMonthAverageDisposalThirdAuxiliaryDieselOil(float monthAverageDisposalThirdAuxiliaryDieselOil) {
        this.monthAverageDisposalThirdAuxiliaryDieselOil = monthAverageDisposalThirdAuxiliaryDieselOil;
    }

    public float getMonthAverageDisposalThirdAuxiliaryNaturalGas() {
        return monthAverageDisposalThirdAuxiliaryNaturalGas;
    }

    public void setMonthAverageDisposalThirdAuxiliaryNaturalGas(float monthAverageDisposalThirdAuxiliaryNaturalGas) {
        this.monthAverageDisposalThirdAuxiliaryNaturalGas = monthAverageDisposalThirdAuxiliaryNaturalGas;
    }

    public float getMonthAverageDisposalThirdAuxiliaryIndustrialWater() {
        return monthAverageDisposalThirdAuxiliaryIndustrialWater;
    }

    public void setMonthAverageDisposalThirdAuxiliaryIndustrialWater(float monthAverageDisposalThirdAuxiliaryIndustrialWater) {
        this.monthAverageDisposalThirdAuxiliaryIndustrialWater = monthAverageDisposalThirdAuxiliaryIndustrialWater;
    }

    public float getMonthAverageDisposalThirdAuxiliaryElectricQuantity() {
        return monthAverageDisposalThirdAuxiliaryElectricQuantity;
    }

    public void setMonthAverageDisposalThirdAuxiliaryElectricQuantity(float monthAverageDisposalThirdAuxiliaryElectricQuantity) {
        this.monthAverageDisposalThirdAuxiliaryElectricQuantity = monthAverageDisposalThirdAuxiliaryElectricQuantity;
    }

    public float getMonthAverageDisposalThirdAuxiliaryTapWaterQuantity() {
        return monthAverageDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public void setMonthAverageDisposalThirdAuxiliaryTapWaterQuantity(float monthAverageDisposalThirdAuxiliaryTapWaterQuantity) {
        this.monthAverageDisposalThirdAuxiliaryTapWaterQuantity = monthAverageDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public float getMonthAverageDisposalTowerElectricQuantity() {
        return monthAverageDisposalTowerElectricQuantity;
    }

    public void setMonthAverageDisposalTowerElectricQuantity(float monthAverageDisposalTowerElectricQuantity) {
        this.monthAverageDisposalTowerElectricQuantity = monthAverageDisposalTowerElectricQuantity;
    }

    public float getLimitDisposalMedicalAuxiliaryNaclo() {
        return limitDisposalMedicalAuxiliaryNaclo;
    }

    public void setLimitDisposalMedicalAuxiliaryNaclo(float limitDisposalMedicalAuxiliaryNaclo) {
        this.limitDisposalMedicalAuxiliaryNaclo = limitDisposalMedicalAuxiliaryNaclo;
    }

    public float getLimitDisposalMedicalAuxiliaryDeodorant() {
        return limitDisposalMedicalAuxiliaryDeodorant;
    }

    public void setLimitDisposalMedicalAuxiliaryDeodorant(float limitDisposalMedicalAuxiliaryDeodorant) {
        this.limitDisposalMedicalAuxiliaryDeodorant = limitDisposalMedicalAuxiliaryDeodorant;
    }

    public float getLimitDisposalMedicalAuxiliaryMedicalWastesBag() {
        return limitDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public void setLimitDisposalMedicalAuxiliaryMedicalWastesBag(float limitDisposalMedicalAuxiliaryMedicalWastesBag) {
        this.limitDisposalMedicalAuxiliaryMedicalWastesBag = limitDisposalMedicalAuxiliaryMedicalWastesBag;
    }

    public float getLimitDisposalMedicalAuxiliaryMedicalPackingPlasticBag() {
        return limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public void setLimitDisposalMedicalAuxiliaryMedicalPackingPlasticBag(float limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag) {
        this.limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag = limitDisposalMedicalAuxiliaryMedicalPackingPlasticBag;
    }

    public float getLimitDisposalMedicalAuxiliaryCollectionBox() {
        return limitDisposalMedicalAuxiliaryCollectionBox;
    }

    public void setLimitDisposalMedicalAuxiliaryCollectionBox(float limitDisposalMedicalAuxiliaryCollectionBox) {
        this.limitDisposalMedicalAuxiliaryCollectionBox = limitDisposalMedicalAuxiliaryCollectionBox;
    }

    public float getLimitDisposalMedicalAuxiliarySteam() {
        return limitDisposalMedicalAuxiliarySteam;
    }

    public void setLimitDisposalMedicalAuxiliarySteam(float limitDisposalMedicalAuxiliarySteam) {
        this.limitDisposalMedicalAuxiliarySteam = limitDisposalMedicalAuxiliarySteam;
    }

    public float getLimitDisposalMedicalAuxiliaryIndustrialWater() {
        return limitDisposalMedicalAuxiliaryIndustrialWater;
    }

    public void setLimitDisposalMedicalAuxiliaryIndustrialWater(float limitDisposalMedicalAuxiliaryIndustrialWater) {
        this.limitDisposalMedicalAuxiliaryIndustrialWater = limitDisposalMedicalAuxiliaryIndustrialWater;
    }

    public float getLimitDisposalMedicalAuxiliaryElectricQuantity() {
        return limitDisposalMedicalAuxiliaryElectricQuantity;
    }

    public void setLimitDisposalMedicalAuxiliaryElectricQuantity(float limitDisposalMedicalAuxiliaryElectricQuantity) {
        this.limitDisposalMedicalAuxiliaryElectricQuantity = limitDisposalMedicalAuxiliaryElectricQuantity;
    }

    public float getLimitDisposalSecondaryAuxiliaryCalcareousLime() {
        return limitDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public void setLimitDisposalSecondaryAuxiliaryCalcareousLime(float limitDisposalSecondaryAuxiliaryCalcareousLime) {
        this.limitDisposalSecondaryAuxiliaryCalcareousLime = limitDisposalSecondaryAuxiliaryCalcareousLime;
    }

    public float getLimitDisposalSecondaryAuxiliaryCommonActivatedCarbon() {
        return limitDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public void setLimitDisposalSecondaryAuxiliaryCommonActivatedCarbon(float limitDisposalSecondaryAuxiliaryCommonActivatedCarbon) {
        this.limitDisposalSecondaryAuxiliaryCommonActivatedCarbon = limitDisposalSecondaryAuxiliaryCommonActivatedCarbon;
    }

    public float getLimitDisposalSecondaryAuxiliaryActivatedCarbon() {
        return limitDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public void setLimitDisposalSecondaryAuxiliaryActivatedCarbon(float limitDisposalSecondaryAuxiliaryActivatedCarbon) {
        this.limitDisposalSecondaryAuxiliaryActivatedCarbon = limitDisposalSecondaryAuxiliaryActivatedCarbon;
    }

    public float getLimitDisposalSecondaryAuxiliaryActivatedCarbonParticles() {
        return limitDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public void setLimitDisposalSecondaryAuxiliaryActivatedCarbonParticles(float limitDisposalSecondaryAuxiliaryActivatedCarbonParticles) {
        this.limitDisposalSecondaryAuxiliaryActivatedCarbonParticles = limitDisposalSecondaryAuxiliaryActivatedCarbonParticles;
    }

    public float getLimitDisposalSecondaryAuxiliaryLye() {
        return limitDisposalSecondaryAuxiliaryLye;
    }

    public void setLimitDisposalSecondaryAuxiliaryLye(float limitDisposalSecondaryAuxiliaryLye) {
        this.limitDisposalSecondaryAuxiliaryLye = limitDisposalSecondaryAuxiliaryLye;
    }

    public float getLimitDisposalSecondaryAuxiliarySalt() {
        return limitDisposalSecondaryAuxiliarySalt;
    }

    public void setLimitDisposalSecondaryAuxiliarySalt(float limitDisposalSecondaryAuxiliarySalt) {
        this.limitDisposalSecondaryAuxiliarySalt = limitDisposalSecondaryAuxiliarySalt;
    }

    public float getLimitDisposalSecondaryAuxiliarySlagBag() {
        return limitDisposalSecondaryAuxiliarySlagBag;
    }

    public void setLimitDisposalSecondaryAuxiliarySlagBag(float limitDisposalSecondaryAuxiliarySlagBag) {
        this.limitDisposalSecondaryAuxiliarySlagBag = limitDisposalSecondaryAuxiliarySlagBag;
    }

    public float getLimitDisposalSecondaryAuxiliaryFlyAshBag() {
        return limitDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public void setLimitDisposalSecondaryAuxiliaryFlyAshBag(float limitDisposalSecondaryAuxiliaryFlyAshBag) {
        this.limitDisposalSecondaryAuxiliaryFlyAshBag = limitDisposalSecondaryAuxiliaryFlyAshBag;
    }

    public float getLimitDisposalSecondaryAuxiliaryDieselOil() {
        return limitDisposalSecondaryAuxiliaryDieselOil;
    }

    public void setLimitDisposalSecondaryAuxiliaryDieselOil(float limitDisposalSecondaryAuxiliaryDieselOil) {
        this.limitDisposalSecondaryAuxiliaryDieselOil = limitDisposalSecondaryAuxiliaryDieselOil;
    }

    public float getLimitDisposalSecondaryAuxiliaryIndustrialWater() {
        return limitDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public void setLimitDisposalSecondaryAuxiliaryIndustrialWater(float limitDisposalSecondaryAuxiliaryIndustrialWater) {
        this.limitDisposalSecondaryAuxiliaryIndustrialWater = limitDisposalSecondaryAuxiliaryIndustrialWater;
    }

    public float getLimitDisposalSecondaryAuxiliaryElectricQuantity() {
        return limitDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public void setLimitDisposalSecondaryAuxiliaryElectricQuantity(float limitDisposalSecondaryAuxiliaryElectricQuantity) {
        this.limitDisposalSecondaryAuxiliaryElectricQuantity = limitDisposalSecondaryAuxiliaryElectricQuantity;
    }

    public float getLimitDisposalSecondaryAuxiliaryWoodenPallets() {
        return limitDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public void setLimitDisposalSecondaryAuxiliaryWoodenPallets(float limitDisposalSecondaryAuxiliaryWoodenPallets) {
        this.limitDisposalSecondaryAuxiliaryWoodenPallets = limitDisposalSecondaryAuxiliaryWoodenPallets;
    }

    public float getLimitDisposalThirdAuxiliaryCalcareousLime() {
        return limitDisposalThirdAuxiliaryCalcareousLime;
    }

    public void setLimitDisposalThirdAuxiliaryCalcareousLime(float limitDisposalThirdAuxiliaryCalcareousLime) {
        this.limitDisposalThirdAuxiliaryCalcareousLime = limitDisposalThirdAuxiliaryCalcareousLime;
    }

    public float getLimitDisposalThirdAuxiliaryCommonActivatedCarbon() {
        return limitDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public void setLimitDisposalThirdAuxiliaryCommonActivatedCarbon(float limitDisposalThirdAuxiliaryCommonActivatedCarbon) {
        this.limitDisposalThirdAuxiliaryCommonActivatedCarbon = limitDisposalThirdAuxiliaryCommonActivatedCarbon;
    }

    public float getLimitDisposalThirdAuxiliaryActivatedCarbon() {
        return limitDisposalThirdAuxiliaryActivatedCarbon;
    }

    public void setLimitDisposalThirdAuxiliaryActivatedCarbon(float limitDisposalThirdAuxiliaryActivatedCarbon) {
        this.limitDisposalThirdAuxiliaryActivatedCarbon = limitDisposalThirdAuxiliaryActivatedCarbon;
    }

    public float getLimitDisposalThirdAuxiliaryActivatedCarbonParticles() {
        return limitDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public void setLimitDisposalThirdAuxiliaryActivatedCarbonParticles(float limitDisposalThirdAuxiliaryActivatedCarbonParticles) {
        this.limitDisposalThirdAuxiliaryActivatedCarbonParticles = limitDisposalThirdAuxiliaryActivatedCarbonParticles;
    }

    public float getLimitDisposalThirdAuxiliaryLye() {
        return limitDisposalThirdAuxiliaryLye;
    }

    public void setLimitDisposalThirdAuxiliaryLye(float limitDisposalThirdAuxiliaryLye) {
        this.limitDisposalThirdAuxiliaryLye = limitDisposalThirdAuxiliaryLye;
    }

    public float getLimitDisposalThirdAuxiliaryCausticSoda() {
        return limitDisposalThirdAuxiliaryCausticSoda;
    }

    public void setLimitDisposalThirdAuxiliaryCausticSoda(float limitDisposalThirdAuxiliaryCausticSoda) {
        this.limitDisposalThirdAuxiliaryCausticSoda = limitDisposalThirdAuxiliaryCausticSoda;
    }

    public float getLimitDisposalThirdAuxiliaryUrea() {
        return limitDisposalThirdAuxiliaryUrea;
    }

    public void setLimitDisposalThirdAuxiliaryUrea(float limitDisposalThirdAuxiliaryUrea) {
        this.limitDisposalThirdAuxiliaryUrea = limitDisposalThirdAuxiliaryUrea;
    }

    public float getLimitDisposalThirdAuxiliaryHydrochloricAcid() {
        return limitDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public void setLimitDisposalThirdAuxiliaryHydrochloricAcid(float limitDisposalThirdAuxiliaryHydrochloricAcid) {
        this.limitDisposalThirdAuxiliaryHydrochloricAcid = limitDisposalThirdAuxiliaryHydrochloricAcid;
    }

    public float getLimitDisposalThirdAuxiliaryNahco3() {
        return limitDisposalThirdAuxiliaryNahco3;
    }

    public void setLimitDisposalThirdAuxiliaryNahco3(float limitDisposalThirdAuxiliaryNahco3) {
        this.limitDisposalThirdAuxiliaryNahco3 = limitDisposalThirdAuxiliaryNahco3;
    }

    public float getLimitDisposalThirdAuxiliaryFlour() {
        return limitDisposalThirdAuxiliaryFlour;
    }

    public void setLimitDisposalThirdAuxiliaryFlour(float limitDisposalThirdAuxiliaryFlour) {
        this.limitDisposalThirdAuxiliaryFlour = limitDisposalThirdAuxiliaryFlour;
    }

    public float getLimitDisposalThirdAuxiliaryDefoamer() {
        return limitDisposalThirdAuxiliaryDefoamer;
    }

    public void setLimitDisposalThirdAuxiliaryDefoamer(float limitDisposalThirdAuxiliaryDefoamer) {
        this.limitDisposalThirdAuxiliaryDefoamer = limitDisposalThirdAuxiliaryDefoamer;
    }

    public float getLimitDisposalThirdAuxiliaryFlocculant() {
        return limitDisposalThirdAuxiliaryFlocculant;
    }

    public void setLimitDisposalThirdAuxiliaryFlocculant(float limitDisposalThirdAuxiliaryFlocculant) {
        this.limitDisposalThirdAuxiliaryFlocculant = limitDisposalThirdAuxiliaryFlocculant;
    }

    public float getLimitDisposalThirdAuxiliarySoftWaterReducingAgent() {
        return limitDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public void setLimitDisposalThirdAuxiliarySoftWaterReducingAgent(float limitDisposalThirdAuxiliarySoftWaterReducingAgent) {
        this.limitDisposalThirdAuxiliarySoftWaterReducingAgent = limitDisposalThirdAuxiliarySoftWaterReducingAgent;
    }

    public float getLimitDisposalThirdAuxiliarySoftWaterScaleInhibitor() {
        return limitDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public void setLimitDisposalThirdAuxiliarySoftWaterScaleInhibitor(float limitDisposalThirdAuxiliarySoftWaterScaleInhibitor) {
        this.limitDisposalThirdAuxiliarySoftWaterScaleInhibitor = limitDisposalThirdAuxiliarySoftWaterScaleInhibitor;
    }

    public float getLimitDisposalThirdAuxiliaryAmmonia() {
        return limitDisposalThirdAuxiliaryAmmonia;
    }

    public void setLimitDisposalThirdAuxiliaryAmmonia(float limitDisposalThirdAuxiliaryAmmonia) {
        this.limitDisposalThirdAuxiliaryAmmonia = limitDisposalThirdAuxiliaryAmmonia;
    }

    public float getLimitDisposalThirdAuxiliaryWaterReducingAgent() {
        return limitDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public void setLimitDisposalThirdAuxiliaryWaterReducingAgent(float limitDisposalThirdAuxiliaryWaterReducingAgent) {
        this.limitDisposalThirdAuxiliaryWaterReducingAgent = limitDisposalThirdAuxiliaryWaterReducingAgent;
    }

    public float getLimitDisposalThirdAuxiliaryWaterScaleInhibitor() {
        return limitDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public void setLimitDisposalThirdAuxiliaryWaterScaleInhibitor(float limitDisposalThirdAuxiliaryWaterScaleInhibitor) {
        this.limitDisposalThirdAuxiliaryWaterScaleInhibitor = limitDisposalThirdAuxiliaryWaterScaleInhibitor;
    }

    public float getLimitDisposalThirdAuxiliaryNaclo() {
        return limitDisposalThirdAuxiliaryNaclo;
    }

    public void setLimitDisposalThirdAuxiliaryNaclo(float limitDisposalThirdAuxiliaryNaclo) {
        this.limitDisposalThirdAuxiliaryNaclo = limitDisposalThirdAuxiliaryNaclo;
    }

    public float getLimitDisposalThirdAuxiliaryStandardBox() {
        return limitDisposalThirdAuxiliaryStandardBox;
    }

    public void setLimitDisposalThirdAuxiliaryStandardBox(float limitDisposalThirdAuxiliaryStandardBox) {
        this.limitDisposalThirdAuxiliaryStandardBox = limitDisposalThirdAuxiliaryStandardBox;
    }

    public float getLimitDisposalThirdAuxiliaryWoodenPallets() {
        return limitDisposalThirdAuxiliaryWoodenPallets;
    }

    public void setLimitDisposalThirdAuxiliaryWoodenPallets(float limitDisposalThirdAuxiliaryWoodenPallets) {
        this.limitDisposalThirdAuxiliaryWoodenPallets = limitDisposalThirdAuxiliaryWoodenPallets;
    }

    public float getLimitDisposalThirdAuxiliaryStandardTray_1m() {
        return limitDisposalThirdAuxiliaryStandardTray_1m;
    }

    public void setLimitDisposalThirdAuxiliaryStandardTray_1m(float limitDisposalThirdAuxiliaryStandardTray_1m) {
        this.limitDisposalThirdAuxiliaryStandardTray_1m = limitDisposalThirdAuxiliaryStandardTray_1m;
    }

    public float getLimitDisposalThirdAuxiliaryStandardTray_1_2m() {
        return limitDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public void setLimitDisposalThirdAuxiliaryStandardTray_1_2m(float limitDisposalThirdAuxiliaryStandardTray_1_2m) {
        this.limitDisposalThirdAuxiliaryStandardTray_1_2m = limitDisposalThirdAuxiliaryStandardTray_1_2m;
    }

    public float getLimitDisposalThirdSecondaryAuxiliarySlagBag() {
        return limitDisposalThirdSecondaryAuxiliarySlagBag;
    }

    public void setLimitDisposalThirdSecondaryAuxiliarySlagBag(float limitDisposalThirdSecondaryAuxiliarySlagBag) {
        this.limitDisposalThirdSecondaryAuxiliarySlagBag = limitDisposalThirdSecondaryAuxiliarySlagBag;
    }

    public float getLimitDisposalThirdAuxiliaryFlyAshBag() {
        return limitDisposalThirdAuxiliaryFlyAshBag;
    }

    public void setLimitDisposalThirdAuxiliaryFlyAshBag(float limitDisposalThirdAuxiliaryFlyAshBag) {
        this.limitDisposalThirdAuxiliaryFlyAshBag = limitDisposalThirdAuxiliaryFlyAshBag;
    }

    public float getLimitDisposalThirdAuxiliaryTonBox() {
        return limitDisposalThirdAuxiliaryTonBox;
    }

    public void setLimitDisposalThirdAuxiliaryTonBox(float limitDisposalThirdAuxiliaryTonBox) {
        this.limitDisposalThirdAuxiliaryTonBox = limitDisposalThirdAuxiliaryTonBox;
    }

    public float getLimitDisposalThirdAuxiliarySteam() {
        return limitDisposalThirdAuxiliarySteam;
    }

    public void setLimitDisposalThirdAuxiliarySteam(float limitDisposalThirdAuxiliarySteam) {
        this.limitDisposalThirdAuxiliarySteam = limitDisposalThirdAuxiliarySteam;
    }

    public float getLimitDisposalThirdAuxiliaryDieselOil() {
        return limitDisposalThirdAuxiliaryDieselOil;
    }

    public void setLimitDisposalThirdAuxiliaryDieselOil(float limitDisposalThirdAuxiliaryDieselOil) {
        this.limitDisposalThirdAuxiliaryDieselOil = limitDisposalThirdAuxiliaryDieselOil;
    }

    public float getLimitDisposalThirdAuxiliaryNaturalGas() {
        return limitDisposalThirdAuxiliaryNaturalGas;
    }

    public void setLimitDisposalThirdAuxiliaryNaturalGas(float limitDisposalThirdAuxiliaryNaturalGas) {
        this.limitDisposalThirdAuxiliaryNaturalGas = limitDisposalThirdAuxiliaryNaturalGas;
    }

    public float getLimitDisposalThirdAuxiliaryIndustrialWater() {
        return limitDisposalThirdAuxiliaryIndustrialWater;
    }

    public void setLimitDisposalThirdAuxiliaryIndustrialWater(float limitDisposalThirdAuxiliaryIndustrialWater) {
        this.limitDisposalThirdAuxiliaryIndustrialWater = limitDisposalThirdAuxiliaryIndustrialWater;
    }

    public float getLimitDisposalThirdAuxiliaryElectricQuantity() {
        return limitDisposalThirdAuxiliaryElectricQuantity;
    }

    public void setLimitDisposalThirdAuxiliaryElectricQuantity(float limitDisposalThirdAuxiliaryElectricQuantity) {
        this.limitDisposalThirdAuxiliaryElectricQuantity = limitDisposalThirdAuxiliaryElectricQuantity;
    }

    public float getLimitDisposalThirdAuxiliaryTapWaterQuantity() {
        return limitDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public void setLimitDisposalThirdAuxiliaryTapWaterQuantity(float limitDisposalThirdAuxiliaryTapWaterQuantity) {
        this.limitDisposalThirdAuxiliaryTapWaterQuantity = limitDisposalThirdAuxiliaryTapWaterQuantity;
    }

    public float getLimitDisposalTowerElectricQuantity() {
        return limitDisposalTowerElectricQuantity;
    }

    public void setLimitDisposalTowerElectricQuantity(float limitDisposalTowerElectricQuantity) {
        this.limitDisposalTowerElectricQuantity = limitDisposalTowerElectricQuantity;
    }

    public float getTodayOutboundA2WastesBulk() {
        return todayOutboundA2WastesBulk;
    }

    public void setTodayOutboundA2WastesBulk(float todayOutboundA2WastesBulk) {
        this.todayOutboundA2WastesBulk = todayOutboundA2WastesBulk;
    }

    public float getTodayOutboundA2WastesCrushing() {
        return todayOutboundA2WastesCrushing;
    }

    public void setTodayOutboundA2WastesCrushing(float todayOutboundA2WastesCrushing) {
        this.todayOutboundA2WastesCrushing = todayOutboundA2WastesCrushing;
    }

    public float getTodayOutboundA2WastesSludge() {
        return todayOutboundA2WastesSludge;
    }

    public void setTodayOutboundA2WastesSludge(float todayOutboundA2WastesSludge) {
        this.todayOutboundA2WastesSludge = todayOutboundA2WastesSludge;
    }

    public float getTodayOutboundA2WastesDistillation() {
        return todayOutboundA2WastesDistillation;
    }

    public void setTodayOutboundA2WastesDistillation(float todayOutboundA2WastesDistillation) {
        this.todayOutboundA2WastesDistillation = todayOutboundA2WastesDistillation;
    }

    public float getTodayOutboundA2WastesSuspension() {
        return todayOutboundA2WastesSuspension;
    }

    public void setTodayOutboundA2WastesSuspension(float todayOutboundA2WastesSuspension) {
        this.todayOutboundA2WastesSuspension = todayOutboundA2WastesSuspension;
    }

    public float getTodayOutboundA2WastesWasteLiquid() {
        return todayOutboundA2WastesWasteLiquid;
    }

    public void setTodayOutboundA2WastesWasteLiquid(float todayOutboundA2WastesWasteLiquid) {
        this.todayOutboundA2WastesWasteLiquid = todayOutboundA2WastesWasteLiquid;
    }

    public float getTodayOutboundA2MedicalWastes() {
        return todayOutboundA2MedicalWastes;
    }

    public void setTodayOutboundA2MedicalWastes(float todayOutboundA2MedicalWastes) {
        this.todayOutboundA2MedicalWastes = todayOutboundA2MedicalWastes;
    }

    public float getMonthOutboundA2WastesBulk() {
        return monthOutboundA2WastesBulk;
    }

    public void setMonthOutboundA2WastesBulk(float monthOutboundA2WastesBulk) {
        this.monthOutboundA2WastesBulk = monthOutboundA2WastesBulk;
    }

    public float getMonthOutboundA2WastesCrushing() {
        return monthOutboundA2WastesCrushing;
    }

    public void setMonthOutboundA2WastesCrushing(float monthOutboundA2WastesCrushing) {
        this.monthOutboundA2WastesCrushing = monthOutboundA2WastesCrushing;
    }

    public float getMonthOutboundA2WastesSludge() {
        return monthOutboundA2WastesSludge;
    }

    public void setMonthOutboundA2WastesSludge(float monthOutboundA2WastesSludge) {
        this.monthOutboundA2WastesSludge = monthOutboundA2WastesSludge;
    }

    public float getMonthOutboundA2WastesDistillation() {
        return monthOutboundA2WastesDistillation;
    }

    public void setMonthOutboundA2WastesDistillation(float monthOutboundA2WastesDistillation) {
        this.monthOutboundA2WastesDistillation = monthOutboundA2WastesDistillation;
    }

    public float getMonthOutboundA2WastesSuspension() {
        return monthOutboundA2WastesSuspension;
    }

    public void setMonthOutboundA2WastesSuspension(float monthOutboundA2WastesSuspension) {
        this.monthOutboundA2WastesSuspension = monthOutboundA2WastesSuspension;
    }

    public float getMonthOutboundA2WastesWasteLiquid() {
        return monthOutboundA2WastesWasteLiquid;
    }

    public void setMonthOutboundA2WastesWasteLiquid(float monthOutboundA2WastesWasteLiquid) {
        this.monthOutboundA2WastesWasteLiquid = monthOutboundA2WastesWasteLiquid;
    }

    public float getMonthOutboundA2MedicalWastes() {
        return monthOutboundA2MedicalWastes;
    }

    public void setMonthOutboundA2MedicalWastes(float monthOutboundA2MedicalWastes) {
        this.monthOutboundA2MedicalWastes = monthOutboundA2MedicalWastes;
    }

    public float getYearOutboundA2WastesBulk() {
        return yearOutboundA2WastesBulk;
    }

    public void setYearOutboundA2WastesBulk(float yearOutboundA2WastesBulk) {
        this.yearOutboundA2WastesBulk = yearOutboundA2WastesBulk;
    }

    public float getYearOutboundA2WastesCrushing() {
        return yearOutboundA2WastesCrushing;
    }

    public void setYearOutboundA2WastesCrushing(float yearOutboundA2WastesCrushing) {
        this.yearOutboundA2WastesCrushing = yearOutboundA2WastesCrushing;
    }

    public float getYearOutboundA2WastesSludge() {
        return yearOutboundA2WastesSludge;
    }

    public void setYearOutboundA2WastesSludge(float yearOutboundA2WastesSludge) {
        this.yearOutboundA2WastesSludge = yearOutboundA2WastesSludge;
    }

    public float getYearOutboundA2WastesDistillation() {
        return yearOutboundA2WastesDistillation;
    }

    public void setYearOutboundA2WastesDistillation(float yearOutboundA2WastesDistillation) {
        this.yearOutboundA2WastesDistillation = yearOutboundA2WastesDistillation;
    }

    public float getYearOutboundA2WastesSuspension() {
        return yearOutboundA2WastesSuspension;
    }

    public void setYearOutboundA2WastesSuspension(float yearOutboundA2WastesSuspension) {
        this.yearOutboundA2WastesSuspension = yearOutboundA2WastesSuspension;
    }

    public float getYearOutboundA2WastesWasteLiquid() {
        return yearOutboundA2WastesWasteLiquid;
    }

    public void setYearOutboundA2WastesWasteLiquid(float yearOutboundA2WastesWasteLiquid) {
        this.yearOutboundA2WastesWasteLiquid = yearOutboundA2WastesWasteLiquid;
    }

    public float getYearOutboundA2MedicalWastes() {
        return yearOutboundA2MedicalWastes;
    }

    public void setYearOutboundA2MedicalWastes(float yearOutboundA2MedicalWastes) {
        this.yearOutboundA2MedicalWastes = yearOutboundA2MedicalWastes;
    }

    public float getTodayOutboundPrepare2WastesBulk() {
        return todayOutboundPrepare2WastesBulk;
    }

    public void setTodayOutboundPrepare2WastesBulk(float todayOutboundPrepare2WastesBulk) {
        this.todayOutboundPrepare2WastesBulk = todayOutboundPrepare2WastesBulk;
    }

    public float getTodayOutboundPrepare2WastesCrushing() {
        return todayOutboundPrepare2WastesCrushing;
    }

    public void setTodayOutboundPrepare2WastesCrushing(float todayOutboundPrepare2WastesCrushing) {
        this.todayOutboundPrepare2WastesCrushing = todayOutboundPrepare2WastesCrushing;
    }

    public float getTodayOutboundPrepare2WastesSludge() {
        return todayOutboundPrepare2WastesSludge;
    }

    public void setTodayOutboundPrepare2WastesSludge(float todayOutboundPrepare2WastesSludge) {
        this.todayOutboundPrepare2WastesSludge = todayOutboundPrepare2WastesSludge;
    }

    public float getTodayOutboundPrepare2WastesDistillation() {
        return todayOutboundPrepare2WastesDistillation;
    }

    public void setTodayOutboundPrepare2WastesDistillation(float todayOutboundPrepare2WastesDistillation) {
        this.todayOutboundPrepare2WastesDistillation = todayOutboundPrepare2WastesDistillation;
    }

    public float getTodayOutboundPrepare2WastesSuspension() {
        return todayOutboundPrepare2WastesSuspension;
    }

    public void setTodayOutboundPrepare2WastesSuspension(float todayOutboundPrepare2WastesSuspension) {
        this.todayOutboundPrepare2WastesSuspension = todayOutboundPrepare2WastesSuspension;
    }

    public float getTodayOutboundPrepare2WastesWasteLiquid() {
        return todayOutboundPrepare2WastesWasteLiquid;
    }

    public void setTodayOutboundPrepare2WastesWasteLiquid(float todayOutboundPrepare2WastesWasteLiquid) {
        this.todayOutboundPrepare2WastesWasteLiquid = todayOutboundPrepare2WastesWasteLiquid;
    }

    public float getTodayOutboundPrepare2MedicalWastes() {
        return todayOutboundPrepare2MedicalWastes;
    }

    public void setTodayOutboundPrepare2MedicalWastes(float todayOutboundPrepare2MedicalWastes) {
        this.todayOutboundPrepare2MedicalWastes = todayOutboundPrepare2MedicalWastes;
    }

    public float getMonthOutboundPrepare2WastesBulk() {
        return monthOutboundPrepare2WastesBulk;
    }

    public void setMonthOutboundPrepare2WastesBulk(float monthOutboundPrepare2WastesBulk) {
        this.monthOutboundPrepare2WastesBulk = monthOutboundPrepare2WastesBulk;
    }

    public float getMonthOutboundPrepare2WastesCrushing() {
        return monthOutboundPrepare2WastesCrushing;
    }

    public void setMonthOutboundPrepare2WastesCrushing(float monthOutboundPrepare2WastesCrushing) {
        this.monthOutboundPrepare2WastesCrushing = monthOutboundPrepare2WastesCrushing;
    }

    public float getMonthOutboundPrepare2WastesSludge() {
        return monthOutboundPrepare2WastesSludge;
    }

    public void setMonthOutboundPrepare2WastesSludge(float monthOutboundPrepare2WastesSludge) {
        this.monthOutboundPrepare2WastesSludge = monthOutboundPrepare2WastesSludge;
    }

    public float getMonthOutboundPrepare2WastesDistillation() {
        return monthOutboundPrepare2WastesDistillation;
    }

    public void setMonthOutboundPrepare2WastesDistillation(float monthOutboundPrepare2WastesDistillation) {
        this.monthOutboundPrepare2WastesDistillation = monthOutboundPrepare2WastesDistillation;
    }

    public float getMonthOutboundPrepare2WastesSuspension() {
        return monthOutboundPrepare2WastesSuspension;
    }

    public void setMonthOutboundPrepare2WastesSuspension(float monthOutboundPrepare2WastesSuspension) {
        this.monthOutboundPrepare2WastesSuspension = monthOutboundPrepare2WastesSuspension;
    }

    public float getMonthOutboundPrepare2WastesWasteLiquid() {
        return monthOutboundPrepare2WastesWasteLiquid;
    }

    public void setMonthOutboundPrepare2WastesWasteLiquid(float monthOutboundPrepare2WastesWasteLiquid) {
        this.monthOutboundPrepare2WastesWasteLiquid = monthOutboundPrepare2WastesWasteLiquid;
    }

    public float getMonthOutboundPrepare2MedicalWastes() {
        return monthOutboundPrepare2MedicalWastes;
    }

    public void setMonthOutboundPrepare2MedicalWastes(float monthOutboundPrepare2MedicalWastes) {
        this.monthOutboundPrepare2MedicalWastes = monthOutboundPrepare2MedicalWastes;
    }

    public float getYearOutboundPrepare2WastesBulk() {
        return yearOutboundPrepare2WastesBulk;
    }

    public void setYearOutboundPrepare2WastesBulk(float yearOutboundPrepare2WastesBulk) {
        this.yearOutboundPrepare2WastesBulk = yearOutboundPrepare2WastesBulk;
    }

    public float getYearOutboundPrepare2WastesCrushing() {
        return yearOutboundPrepare2WastesCrushing;
    }

    public void setYearOutboundPrepare2WastesCrushing(float yearOutboundPrepare2WastesCrushing) {
        this.yearOutboundPrepare2WastesCrushing = yearOutboundPrepare2WastesCrushing;
    }

    public float getYearOutboundPrepare2WastesSludge() {
        return yearOutboundPrepare2WastesSludge;
    }

    public void setYearOutboundPrepare2WastesSludge(float yearOutboundPrepare2WastesSludge) {
        this.yearOutboundPrepare2WastesSludge = yearOutboundPrepare2WastesSludge;
    }

    public float getYearOutboundPrepare2WastesDistillation() {
        return yearOutboundPrepare2WastesDistillation;
    }

    public void setYearOutboundPrepare2WastesDistillation(float yearOutboundPrepare2WastesDistillation) {
        this.yearOutboundPrepare2WastesDistillation = yearOutboundPrepare2WastesDistillation;
    }

    public float getYearOutboundPrepare2WastesSuspension() {
        return yearOutboundPrepare2WastesSuspension;
    }

    public void setYearOutboundPrepare2WastesSuspension(float yearOutboundPrepare2WastesSuspension) {
        this.yearOutboundPrepare2WastesSuspension = yearOutboundPrepare2WastesSuspension;
    }

    public float getYearOutboundPrepare2WastesWasteLiquid() {
        return yearOutboundPrepare2WastesWasteLiquid;
    }

    public void setYearOutboundPrepare2WastesWasteLiquid(float yearOutboundPrepare2WastesWasteLiquid) {
        this.yearOutboundPrepare2WastesWasteLiquid = yearOutboundPrepare2WastesWasteLiquid;
    }

    public float getYearOutboundPrepare2MedicalWastes() {
        return yearOutboundPrepare2MedicalWastes;
    }

    public void setYearOutboundPrepare2MedicalWastes(float yearOutboundPrepare2MedicalWastes) {
        this.yearOutboundPrepare2MedicalWastes = yearOutboundPrepare2MedicalWastes;
    }

    public float getTodayOutboundB2WastesBulk() {
        return todayOutboundB2WastesBulk;
    }

    public void setTodayOutboundB2WastesBulk(float todayOutboundB2WastesBulk) {
        this.todayOutboundB2WastesBulk = todayOutboundB2WastesBulk;
    }

    public float getTodayOutboundB2WastesCrushing() {
        return todayOutboundB2WastesCrushing;
    }

    public void setTodayOutboundB2WastesCrushing(float todayOutboundB2WastesCrushing) {
        this.todayOutboundB2WastesCrushing = todayOutboundB2WastesCrushing;
    }

    public float getTodayOutboundB2WastesSludge() {
        return todayOutboundB2WastesSludge;
    }

    public void setTodayOutboundB2WastesSludge(float todayOutboundB2WastesSludge) {
        this.todayOutboundB2WastesSludge = todayOutboundB2WastesSludge;
    }

    public float getTodayOutboundB2WastesDistillation() {
        return todayOutboundB2WastesDistillation;
    }

    public void setTodayOutboundB2WastesDistillation(float todayOutboundB2WastesDistillation) {
        this.todayOutboundB2WastesDistillation = todayOutboundB2WastesDistillation;
    }

    public float getTodayOutboundB2WastesSuspension() {
        return todayOutboundB2WastesSuspension;
    }

    public void setTodayOutboundB2WastesSuspension(float todayOutboundB2WastesSuspension) {
        this.todayOutboundB2WastesSuspension = todayOutboundB2WastesSuspension;
    }

    public float getTodayOutboundB2WastesWasteLiquid() {
        return todayOutboundB2WastesWasteLiquid;
    }

    public void setTodayOutboundB2WastesWasteLiquid(float todayOutboundB2WastesWasteLiquid) {
        this.todayOutboundB2WastesWasteLiquid = todayOutboundB2WastesWasteLiquid;
    }

    public float getTodayOutboundB2MedicalWastes() {
        return todayOutboundB2MedicalWastes;
    }

    public void setTodayOutboundB2MedicalWastes(float todayOutboundB2MedicalWastes) {
        this.todayOutboundB2MedicalWastes = todayOutboundB2MedicalWastes;
    }

    public float getMonthOutboundB2WastesBulk() {
        return monthOutboundB2WastesBulk;
    }

    public void setMonthOutboundB2WastesBulk(float monthOutboundB2WastesBulk) {
        this.monthOutboundB2WastesBulk = monthOutboundB2WastesBulk;
    }

    public float getMonthOutboundB2WastesCrushing() {
        return monthOutboundB2WastesCrushing;
    }

    public void setMonthOutboundB2WastesCrushing(float monthOutboundB2WastesCrushing) {
        this.monthOutboundB2WastesCrushing = monthOutboundB2WastesCrushing;
    }

    public float getMonthOutboundB2WastesSludge() {
        return monthOutboundB2WastesSludge;
    }

    public void setMonthOutboundB2WastesSludge(float monthOutboundB2WastesSludge) {
        this.monthOutboundB2WastesSludge = monthOutboundB2WastesSludge;
    }

    public float getMonthOutboundB2WastesDistillation() {
        return monthOutboundB2WastesDistillation;
    }

    public void setMonthOutboundB2WastesDistillation(float monthOutboundB2WastesDistillation) {
        this.monthOutboundB2WastesDistillation = monthOutboundB2WastesDistillation;
    }

    public float getMonthOutboundB2WastesSuspension() {
        return monthOutboundB2WastesSuspension;
    }

    public void setMonthOutboundB2WastesSuspension(float monthOutboundB2WastesSuspension) {
        this.monthOutboundB2WastesSuspension = monthOutboundB2WastesSuspension;
    }

    public float getMonthOutboundB2WastesWasteLiquid() {
        return monthOutboundB2WastesWasteLiquid;
    }

    public void setMonthOutboundB2WastesWasteLiquid(float monthOutboundB2WastesWasteLiquid) {
        this.monthOutboundB2WastesWasteLiquid = monthOutboundB2WastesWasteLiquid;
    }

    public float getMonthOutboundB2MedicalWastes() {
        return monthOutboundB2MedicalWastes;
    }

    public void setMonthOutboundB2MedicalWastes(float monthOutboundB2MedicalWastes) {
        this.monthOutboundB2MedicalWastes = monthOutboundB2MedicalWastes;
    }

    public float getYearOutboundB2WastesBulk() {
        return yearOutboundB2WastesBulk;
    }

    public void setYearOutboundB2WastesBulk(float yearOutboundB2WastesBulk) {
        this.yearOutboundB2WastesBulk = yearOutboundB2WastesBulk;
    }

    public float getYearOutboundB2WastesCrushing() {
        return yearOutboundB2WastesCrushing;
    }

    public void setYearOutboundB2WastesCrushing(float yearOutboundB2WastesCrushing) {
        this.yearOutboundB2WastesCrushing = yearOutboundB2WastesCrushing;
    }

    public float getYearOutboundB2WastesSludge() {
        return yearOutboundB2WastesSludge;
    }

    public void setYearOutboundB2WastesSludge(float yearOutboundB2WastesSludge) {
        this.yearOutboundB2WastesSludge = yearOutboundB2WastesSludge;
    }

    public float getYearOutboundB2WastesDistillation() {
        return yearOutboundB2WastesDistillation;
    }

    public void setYearOutboundB2WastesDistillation(float yearOutboundB2WastesDistillation) {
        this.yearOutboundB2WastesDistillation = yearOutboundB2WastesDistillation;
    }

    public float getYearOutboundB2WastesSuspension() {
        return yearOutboundB2WastesSuspension;
    }

    public void setYearOutboundB2WastesSuspension(float yearOutboundB2WastesSuspension) {
        this.yearOutboundB2WastesSuspension = yearOutboundB2WastesSuspension;
    }

    public float getYearOutboundB2WastesWasteLiquid() {
        return yearOutboundB2WastesWasteLiquid;
    }

    public void setYearOutboundB2WastesWasteLiquid(float yearOutboundB2WastesWasteLiquid) {
        this.yearOutboundB2WastesWasteLiquid = yearOutboundB2WastesWasteLiquid;
    }

    public float getYearOutboundB2MedicalWastes() {
        return yearOutboundB2MedicalWastes;
    }

    public void setYearOutboundB2MedicalWastes(float yearOutboundB2MedicalWastes) {
        this.yearOutboundB2MedicalWastes = yearOutboundB2MedicalWastes;
    }

    public float getTodayOutboundB2RateWastesBulk() {
        return todayOutboundB2RateWastesBulk;
    }

    public void setTodayOutboundB2RateWastesBulk(float todayOutboundB2RateWastesBulk) {
        this.todayOutboundB2RateWastesBulk = todayOutboundB2RateWastesBulk;
    }

    public float getTodayOutboundB2RateWastesCrushing() {
        return todayOutboundB2RateWastesCrushing;
    }

    public void setTodayOutboundB2RateWastesCrushing(float todayOutboundB2RateWastesCrushing) {
        this.todayOutboundB2RateWastesCrushing = todayOutboundB2RateWastesCrushing;
    }

    public float getTodayOutboundB2RateWastesSludge() {
        return todayOutboundB2RateWastesSludge;
    }

    public void setTodayOutboundB2RateWastesSludge(float todayOutboundB2RateWastesSludge) {
        this.todayOutboundB2RateWastesSludge = todayOutboundB2RateWastesSludge;
    }

    public float getTodayOutboundB2RateWastesDistillation() {
        return todayOutboundB2RateWastesDistillation;
    }

    public void setTodayOutboundB2RateWastesDistillation(float todayOutboundB2RateWastesDistillation) {
        this.todayOutboundB2RateWastesDistillation = todayOutboundB2RateWastesDistillation;
    }

    public float getTodayOutboundB2RateWastesSuspension() {
        return todayOutboundB2RateWastesSuspension;
    }

    public void setTodayOutboundB2RateWastesSuspension(float todayOutboundB2RateWastesSuspension) {
        this.todayOutboundB2RateWastesSuspension = todayOutboundB2RateWastesSuspension;
    }

    public float getTodayOutboundB2RateWastesWasteLiquid() {
        return todayOutboundB2RateWastesWasteLiquid;
    }

    public void setTodayOutboundB2RateWastesWasteLiquid(float todayOutboundB2RateWastesWasteLiquid) {
        this.todayOutboundB2RateWastesWasteLiquid = todayOutboundB2RateWastesWasteLiquid;
    }

    public float getTodayOutboundB2RateMedicalWastes() {
        return todayOutboundB2RateMedicalWastes;
    }

    public void setTodayOutboundB2RateMedicalWastes(float todayOutboundB2RateMedicalWastes) {
        this.todayOutboundB2RateMedicalWastes = todayOutboundB2RateMedicalWastes;
    }

    public float getTodayOutboundSecondPretreatmentWastesBulk() {
        return todayOutboundSecondPretreatmentWastesBulk;
    }

    public void setTodayOutboundSecondPretreatmentWastesBulk(float todayOutboundSecondPretreatmentWastesBulk) {
        this.todayOutboundSecondPretreatmentWastesBulk = todayOutboundSecondPretreatmentWastesBulk;
    }

    public float getTodayOutboundSecondPretreatmentWastesCrushing() {
        return todayOutboundSecondPretreatmentWastesCrushing;
    }

    public void setTodayOutboundSecondPretreatmentWastesCrushing(float todayOutboundSecondPretreatmentWastesCrushing) {
        this.todayOutboundSecondPretreatmentWastesCrushing = todayOutboundSecondPretreatmentWastesCrushing;
    }

    public float getTodayOutboundSecondPretreatmentWastesSludge() {
        return todayOutboundSecondPretreatmentWastesSludge;
    }

    public void setTodayOutboundSecondPretreatmentWastesSludge(float todayOutboundSecondPretreatmentWastesSludge) {
        this.todayOutboundSecondPretreatmentWastesSludge = todayOutboundSecondPretreatmentWastesSludge;
    }

    public float getTodayOutboundSecondPretreatmentWastesDistillation() {
        return todayOutboundSecondPretreatmentWastesDistillation;
    }

    public void setTodayOutboundSecondPretreatmentWastesDistillation(float todayOutboundSecondPretreatmentWastesDistillation) {
        this.todayOutboundSecondPretreatmentWastesDistillation = todayOutboundSecondPretreatmentWastesDistillation;
    }

    public float getTodayOutboundSecondPretreatmentWastesSuspension() {
        return todayOutboundSecondPretreatmentWastesSuspension;
    }

    public void setTodayOutboundSecondPretreatmentWastesSuspension(float todayOutboundSecondPretreatmentWastesSuspension) {
        this.todayOutboundSecondPretreatmentWastesSuspension = todayOutboundSecondPretreatmentWastesSuspension;
    }

    public float getTodayOutboundSecondPretreatmentWastesWasteLiquid() {
        return todayOutboundSecondPretreatmentWastesWasteLiquid;
    }

    public void setTodayOutboundSecondPretreatmentWastesWasteLiquid(float todayOutboundSecondPretreatmentWastesWasteLiquid) {
        this.todayOutboundSecondPretreatmentWastesWasteLiquid = todayOutboundSecondPretreatmentWastesWasteLiquid;
    }

    public float getTodayOutboundSecondPretreatmentMedicalWastes() {
        return todayOutboundSecondPretreatmentMedicalWastes;
    }

    public void setTodayOutboundSecondPretreatmentMedicalWastes(float todayOutboundSecondPretreatmentMedicalWastes) {
        this.todayOutboundSecondPretreatmentMedicalWastes = todayOutboundSecondPretreatmentMedicalWastes;
    }

    public float getMonthOutboundSecondPretreatmentWastesBulk() {
        return monthOutboundSecondPretreatmentWastesBulk;
    }

    public void setMonthOutboundSecondPretreatmentWastesBulk(float monthOutboundSecondPretreatmentWastesBulk) {
        this.monthOutboundSecondPretreatmentWastesBulk = monthOutboundSecondPretreatmentWastesBulk;
    }

    public float getMonthOutboundSecondPretreatmentWastesCrushing() {
        return monthOutboundSecondPretreatmentWastesCrushing;
    }

    public void setMonthOutboundSecondPretreatmentWastesCrushing(float monthOutboundSecondPretreatmentWastesCrushing) {
        this.monthOutboundSecondPretreatmentWastesCrushing = monthOutboundSecondPretreatmentWastesCrushing;
    }

    public float getMonthOutboundSecondPretreatmentWastesSludge() {
        return monthOutboundSecondPretreatmentWastesSludge;
    }

    public void setMonthOutboundSecondPretreatmentWastesSludge(float monthOutboundSecondPretreatmentWastesSludge) {
        this.monthOutboundSecondPretreatmentWastesSludge = monthOutboundSecondPretreatmentWastesSludge;
    }

    public float getMonthOutboundSecondPretreatmentWastesDistillation() {
        return monthOutboundSecondPretreatmentWastesDistillation;
    }

    public void setMonthOutboundSecondPretreatmentWastesDistillation(float monthOutboundSecondPretreatmentWastesDistillation) {
        this.monthOutboundSecondPretreatmentWastesDistillation = monthOutboundSecondPretreatmentWastesDistillation;
    }

    public float getMonthOutboundSecondPretreatmentWastesSuspension() {
        return monthOutboundSecondPretreatmentWastesSuspension;
    }

    public void setMonthOutboundSecondPretreatmentWastesSuspension(float monthOutboundSecondPretreatmentWastesSuspension) {
        this.monthOutboundSecondPretreatmentWastesSuspension = monthOutboundSecondPretreatmentWastesSuspension;
    }

    public float getMonthOutboundSecondPretreatmentWastesWasteLiquid() {
        return monthOutboundSecondPretreatmentWastesWasteLiquid;
    }

    public void setMonthOutboundSecondPretreatmentWastesWasteLiquid(float monthOutboundSecondPretreatmentWastesWasteLiquid) {
        this.monthOutboundSecondPretreatmentWastesWasteLiquid = monthOutboundSecondPretreatmentWastesWasteLiquid;
    }

    public float getMonthOutboundSecondPretreatmentMedicalWastes() {
        return monthOutboundSecondPretreatmentMedicalWastes;
    }

    public void setMonthOutboundSecondPretreatmentMedicalWastes(float monthOutboundSecondPretreatmentMedicalWastes) {
        this.monthOutboundSecondPretreatmentMedicalWastes = monthOutboundSecondPretreatmentMedicalWastes;
    }

    public float getYearOutboundSecondPretreatmentWastesBulk() {
        return yearOutboundSecondPretreatmentWastesBulk;
    }

    public void setYearOutboundSecondPretreatmentWastesBulk(float yearOutboundSecondPretreatmentWastesBulk) {
        this.yearOutboundSecondPretreatmentWastesBulk = yearOutboundSecondPretreatmentWastesBulk;
    }

    public float getYearOutboundSecondPretreatmentWastesCrushing() {
        return yearOutboundSecondPretreatmentWastesCrushing;
    }

    public void setYearOutboundSecondPretreatmentWastesCrushing(float yearOutboundSecondPretreatmentWastesCrushing) {
        this.yearOutboundSecondPretreatmentWastesCrushing = yearOutboundSecondPretreatmentWastesCrushing;
    }

    public float getYearOutboundSecondPretreatmentWastesSludge() {
        return yearOutboundSecondPretreatmentWastesSludge;
    }

    public void setYearOutboundSecondPretreatmentWastesSludge(float yearOutboundSecondPretreatmentWastesSludge) {
        this.yearOutboundSecondPretreatmentWastesSludge = yearOutboundSecondPretreatmentWastesSludge;
    }

    public float getYearOutboundSecondPretreatmentWastesDistillation() {
        return yearOutboundSecondPretreatmentWastesDistillation;
    }

    public void setYearOutboundSecondPretreatmentWastesDistillation(float yearOutboundSecondPretreatmentWastesDistillation) {
        this.yearOutboundSecondPretreatmentWastesDistillation = yearOutboundSecondPretreatmentWastesDistillation;
    }

    public float getYearOutboundSecondPretreatmentWastesSuspension() {
        return yearOutboundSecondPretreatmentWastesSuspension;
    }

    public void setYearOutboundSecondPretreatmentWastesSuspension(float yearOutboundSecondPretreatmentWastesSuspension) {
        this.yearOutboundSecondPretreatmentWastesSuspension = yearOutboundSecondPretreatmentWastesSuspension;
    }

    public float getYearOutboundSecondPretreatmentWastesWasteLiquid() {
        return yearOutboundSecondPretreatmentWastesWasteLiquid;
    }

    public void setYearOutboundSecondPretreatmentWastesWasteLiquid(float yearOutboundSecondPretreatmentWastesWasteLiquid) {
        this.yearOutboundSecondPretreatmentWastesWasteLiquid = yearOutboundSecondPretreatmentWastesWasteLiquid;
    }

    public float getYearOutboundSecondPretreatmentMedicalWastes() {
        return yearOutboundSecondPretreatmentMedicalWastes;
    }

    public void setYearOutboundSecondPretreatmentMedicalWastes(float yearOutboundSecondPretreatmentMedicalWastes) {
        this.yearOutboundSecondPretreatmentMedicalWastes = yearOutboundSecondPretreatmentMedicalWastes;
    }

    public float getTodayOutboundThirdPretreatmentSystemWastesBulk() {
        return todayOutboundThirdPretreatmentSystemWastesBulk;
    }

    public void setTodayOutboundThirdPretreatmentSystemWastesBulk(float todayOutboundThirdPretreatmentSystemWastesBulk) {
        this.todayOutboundThirdPretreatmentSystemWastesBulk = todayOutboundThirdPretreatmentSystemWastesBulk;
    }

    public float getTodayOutboundThirdPretreatmentSystemWastesCrushing() {
        return todayOutboundThirdPretreatmentSystemWastesCrushing;
    }

    public void setTodayOutboundThirdPretreatmentSystemWastesCrushing(float todayOutboundThirdPretreatmentSystemWastesCrushing) {
        this.todayOutboundThirdPretreatmentSystemWastesCrushing = todayOutboundThirdPretreatmentSystemWastesCrushing;
    }

    public float getTodayOutboundThirdPretreatmentSystemWastesSludge() {
        return todayOutboundThirdPretreatmentSystemWastesSludge;
    }

    public void setTodayOutboundThirdPretreatmentSystemWastesSludge(float todayOutboundThirdPretreatmentSystemWastesSludge) {
        this.todayOutboundThirdPretreatmentSystemWastesSludge = todayOutboundThirdPretreatmentSystemWastesSludge;
    }

    public float getTodayOutboundThirdPretreatmentSystemWastesDistillation() {
        return todayOutboundThirdPretreatmentSystemWastesDistillation;
    }

    public void setTodayOutboundThirdPretreatmentSystemWastesDistillation(float todayOutboundThirdPretreatmentSystemWastesDistillation) {
        this.todayOutboundThirdPretreatmentSystemWastesDistillation = todayOutboundThirdPretreatmentSystemWastesDistillation;
    }

    public float getTodayOutboundThirdPretreatmentSystemWastesSuspension() {
        return todayOutboundThirdPretreatmentSystemWastesSuspension;
    }

    public void setTodayOutboundThirdPretreatmentSystemWastesSuspension(float todayOutboundThirdPretreatmentSystemWastesSuspension) {
        this.todayOutboundThirdPretreatmentSystemWastesSuspension = todayOutboundThirdPretreatmentSystemWastesSuspension;
    }

    public float getTodayOutboundThirdPretreatmentSystemWastesWasteLiquid() {
        return todayOutboundThirdPretreatmentSystemWastesWasteLiquid;
    }

    public void setTodayOutboundThirdPretreatmentSystemWastesWasteLiquid(float todayOutboundThirdPretreatmentSystemWastesWasteLiquid) {
        this.todayOutboundThirdPretreatmentSystemWastesWasteLiquid = todayOutboundThirdPretreatmentSystemWastesWasteLiquid;
    }

    public float getTodayOutboundThirdPretreatmentSystemMedicalWastes() {
        return todayOutboundThirdPretreatmentSystemMedicalWastes;
    }

    public void setTodayOutboundThirdPretreatmentSystemMedicalWastes(float todayOutboundThirdPretreatmentSystemMedicalWastes) {
        this.todayOutboundThirdPretreatmentSystemMedicalWastes = todayOutboundThirdPretreatmentSystemMedicalWastes;
    }

    public float getMonthOutboundThirdPretreatmentSystemWastesBulk() {
        return monthOutboundThirdPretreatmentSystemWastesBulk;
    }

    public void setMonthOutboundThirdPretreatmentSystemWastesBulk(float monthOutboundThirdPretreatmentSystemWastesBulk) {
        this.monthOutboundThirdPretreatmentSystemWastesBulk = monthOutboundThirdPretreatmentSystemWastesBulk;
    }

    public float getMonthOutboundThirdPretreatmentSystemWastesCrushing() {
        return monthOutboundThirdPretreatmentSystemWastesCrushing;
    }

    public void setMonthOutboundThirdPretreatmentSystemWastesCrushing(float monthOutboundThirdPretreatmentSystemWastesCrushing) {
        this.monthOutboundThirdPretreatmentSystemWastesCrushing = monthOutboundThirdPretreatmentSystemWastesCrushing;
    }

    public float getMonthOutboundThirdPretreatmentSystemWastesSludge() {
        return monthOutboundThirdPretreatmentSystemWastesSludge;
    }

    public void setMonthOutboundThirdPretreatmentSystemWastesSludge(float monthOutboundThirdPretreatmentSystemWastesSludge) {
        this.monthOutboundThirdPretreatmentSystemWastesSludge = monthOutboundThirdPretreatmentSystemWastesSludge;
    }

    public float getMonthOutboundThirdPretreatmentSystemWastesDistillation() {
        return monthOutboundThirdPretreatmentSystemWastesDistillation;
    }

    public void setMonthOutboundThirdPretreatmentSystemWastesDistillation(float monthOutboundThirdPretreatmentSystemWastesDistillation) {
        this.monthOutboundThirdPretreatmentSystemWastesDistillation = monthOutboundThirdPretreatmentSystemWastesDistillation;
    }

    public float getMonthOutboundThirdPretreatmentSystemWastesSuspension() {
        return monthOutboundThirdPretreatmentSystemWastesSuspension;
    }

    public void setMonthOutboundThirdPretreatmentSystemWastesSuspension(float monthOutboundThirdPretreatmentSystemWastesSuspension) {
        this.monthOutboundThirdPretreatmentSystemWastesSuspension = monthOutboundThirdPretreatmentSystemWastesSuspension;
    }

    public float getMonthOutboundThirdPretreatmentSystemWastesWasteLiquid() {
        return monthOutboundThirdPretreatmentSystemWastesWasteLiquid;
    }

    public void setMonthOutboundThirdPretreatmentSystemWastesWasteLiquid(float monthOutboundThirdPretreatmentSystemWastesWasteLiquid) {
        this.monthOutboundThirdPretreatmentSystemWastesWasteLiquid = monthOutboundThirdPretreatmentSystemWastesWasteLiquid;
    }

    public float getMonthOutboundThirdPretreatmentSystemMedicalWastes() {
        return monthOutboundThirdPretreatmentSystemMedicalWastes;
    }

    public void setMonthOutboundThirdPretreatmentSystemMedicalWastes(float monthOutboundThirdPretreatmentSystemMedicalWastes) {
        this.monthOutboundThirdPretreatmentSystemMedicalWastes = monthOutboundThirdPretreatmentSystemMedicalWastes;
    }

    public float getYearOutboundThirdPretreatmentSystemWastesBulk() {
        return yearOutboundThirdPretreatmentSystemWastesBulk;
    }

    public void setYearOutboundThirdPretreatmentSystemWastesBulk(float yearOutboundThirdPretreatmentSystemWastesBulk) {
        this.yearOutboundThirdPretreatmentSystemWastesBulk = yearOutboundThirdPretreatmentSystemWastesBulk;
    }

    public float getYearOutboundThirdPretreatmentSystemWastesCrushing() {
        return yearOutboundThirdPretreatmentSystemWastesCrushing;
    }

    public void setYearOutboundThirdPretreatmentSystemWastesCrushing(float yearOutboundThirdPretreatmentSystemWastesCrushing) {
        this.yearOutboundThirdPretreatmentSystemWastesCrushing = yearOutboundThirdPretreatmentSystemWastesCrushing;
    }

    public float getYearOutboundThirdPretreatmentSystemWastesSludge() {
        return yearOutboundThirdPretreatmentSystemWastesSludge;
    }

    public void setYearOutboundThirdPretreatmentSystemWastesSludge(float yearOutboundThirdPretreatmentSystemWastesSludge) {
        this.yearOutboundThirdPretreatmentSystemWastesSludge = yearOutboundThirdPretreatmentSystemWastesSludge;
    }

    public float getYearOutboundThirdPretreatmentSystemWastesDistillation() {
        return yearOutboundThirdPretreatmentSystemWastesDistillation;
    }

    public void setYearOutboundThirdPretreatmentSystemWastesDistillation(float yearOutboundThirdPretreatmentSystemWastesDistillation) {
        this.yearOutboundThirdPretreatmentSystemWastesDistillation = yearOutboundThirdPretreatmentSystemWastesDistillation;
    }

    public float getYearOutboundThirdPretreatmentSystemWastesSuspension() {
        return yearOutboundThirdPretreatmentSystemWastesSuspension;
    }

    public void setYearOutboundThirdPretreatmentSystemWastesSuspension(float yearOutboundThirdPretreatmentSystemWastesSuspension) {
        this.yearOutboundThirdPretreatmentSystemWastesSuspension = yearOutboundThirdPretreatmentSystemWastesSuspension;
    }

    public float getYearOutboundThirdPretreatmentSystemWastesWasteLiquid() {
        return yearOutboundThirdPretreatmentSystemWastesWasteLiquid;
    }

    public void setYearOutboundThirdPretreatmentSystemWastesWasteLiquid(float yearOutboundThirdPretreatmentSystemWastesWasteLiquid) {
        this.yearOutboundThirdPretreatmentSystemWastesWasteLiquid = yearOutboundThirdPretreatmentSystemWastesWasteLiquid;
    }

    public float getYearOutboundThirdPretreatmentSystemMedicalWastes() {
        return yearOutboundThirdPretreatmentSystemMedicalWastes;
    }

    public void setYearOutboundThirdPretreatmentSystemMedicalWastes(float yearOutboundThirdPretreatmentSystemMedicalWastes) {
        this.yearOutboundThirdPretreatmentSystemMedicalWastes = yearOutboundThirdPretreatmentSystemMedicalWastes;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateWastesBulk() {
        return todayOutboundThirdPretreatmentSystemRateWastesBulk;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateWastesBulk(float todayOutboundThirdPretreatmentSystemRateWastesBulk) {
        this.todayOutboundThirdPretreatmentSystemRateWastesBulk = todayOutboundThirdPretreatmentSystemRateWastesBulk;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateWastesCrushing() {
        return todayOutboundThirdPretreatmentSystemRateWastesCrushing;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateWastesCrushing(float todayOutboundThirdPretreatmentSystemRateWastesCrushing) {
        this.todayOutboundThirdPretreatmentSystemRateWastesCrushing = todayOutboundThirdPretreatmentSystemRateWastesCrushing;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateWastesSludge() {
        return todayOutboundThirdPretreatmentSystemRateWastesSludge;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateWastesSludge(float todayOutboundThirdPretreatmentSystemRateWastesSludge) {
        this.todayOutboundThirdPretreatmentSystemRateWastesSludge = todayOutboundThirdPretreatmentSystemRateWastesSludge;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateWastesDistillation() {
        return todayOutboundThirdPretreatmentSystemRateWastesDistillation;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateWastesDistillation(float todayOutboundThirdPretreatmentSystemRateWastesDistillation) {
        this.todayOutboundThirdPretreatmentSystemRateWastesDistillation = todayOutboundThirdPretreatmentSystemRateWastesDistillation;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateWastesSuspension() {
        return todayOutboundThirdPretreatmentSystemRateWastesSuspension;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateWastesSuspension(float todayOutboundThirdPretreatmentSystemRateWastesSuspension) {
        this.todayOutboundThirdPretreatmentSystemRateWastesSuspension = todayOutboundThirdPretreatmentSystemRateWastesSuspension;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateWastesWasteLiquid() {
        return todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateWastesWasteLiquid(float todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid) {
        this.todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid = todayOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    }

    public float getTodayOutboundThirdPretreatmentSystemRateMedicalWastes() {
        return todayOutboundThirdPretreatmentSystemRateMedicalWastes;
    }

    public void setTodayOutboundThirdPretreatmentSystemRateMedicalWastes(float todayOutboundThirdPretreatmentSystemRateMedicalWastes) {
        this.todayOutboundThirdPretreatmentSystemRateMedicalWastes = todayOutboundThirdPretreatmentSystemRateMedicalWastes;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateWastesBulk() {
        return monthOutboundThirdPretreatmentSystemRateWastesBulk;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateWastesBulk(float monthOutboundThirdPretreatmentSystemRateWastesBulk) {
        this.monthOutboundThirdPretreatmentSystemRateWastesBulk = monthOutboundThirdPretreatmentSystemRateWastesBulk;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateWastesCrushing() {
        return monthOutboundThirdPretreatmentSystemRateWastesCrushing;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateWastesCrushing(float monthOutboundThirdPretreatmentSystemRateWastesCrushing) {
        this.monthOutboundThirdPretreatmentSystemRateWastesCrushing = monthOutboundThirdPretreatmentSystemRateWastesCrushing;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateWastesSludge() {
        return monthOutboundThirdPretreatmentSystemRateWastesSludge;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateWastesSludge(float monthOutboundThirdPretreatmentSystemRateWastesSludge) {
        this.monthOutboundThirdPretreatmentSystemRateWastesSludge = monthOutboundThirdPretreatmentSystemRateWastesSludge;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateWastesDistillation() {
        return monthOutboundThirdPretreatmentSystemRateWastesDistillation;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateWastesDistillation(float monthOutboundThirdPretreatmentSystemRateWastesDistillation) {
        this.monthOutboundThirdPretreatmentSystemRateWastesDistillation = monthOutboundThirdPretreatmentSystemRateWastesDistillation;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateWastesSuspension() {
        return monthOutboundThirdPretreatmentSystemRateWastesSuspension;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateWastesSuspension(float monthOutboundThirdPretreatmentSystemRateWastesSuspension) {
        this.monthOutboundThirdPretreatmentSystemRateWastesSuspension = monthOutboundThirdPretreatmentSystemRateWastesSuspension;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateWastesWasteLiquid() {
        return monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateWastesWasteLiquid(float monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid) {
        this.monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid = monthOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    }

    public float getMonthOutboundThirdPretreatmentSystemRateMedicalWastes() {
        return monthOutboundThirdPretreatmentSystemRateMedicalWastes;
    }

    public void setMonthOutboundThirdPretreatmentSystemRateMedicalWastes(float monthOutboundThirdPretreatmentSystemRateMedicalWastes) {
        this.monthOutboundThirdPretreatmentSystemRateMedicalWastes = monthOutboundThirdPretreatmentSystemRateMedicalWastes;
    }

    public float getYearOutboundThirdPretreatmentSystemRateWastesBulk() {
        return yearOutboundThirdPretreatmentSystemRateWastesBulk;
    }

    public void setYearOutboundThirdPretreatmentSystemRateWastesBulk(float yearOutboundThirdPretreatmentSystemRateWastesBulk) {
        this.yearOutboundThirdPretreatmentSystemRateWastesBulk = yearOutboundThirdPretreatmentSystemRateWastesBulk;
    }

    public float getYearOutboundThirdPretreatmentSystemRateWastesCrushing() {
        return yearOutboundThirdPretreatmentSystemRateWastesCrushing;
    }

    public void setYearOutboundThirdPretreatmentSystemRateWastesCrushing(float yearOutboundThirdPretreatmentSystemRateWastesCrushing) {
        this.yearOutboundThirdPretreatmentSystemRateWastesCrushing = yearOutboundThirdPretreatmentSystemRateWastesCrushing;
    }

    public float getYearOutboundThirdPretreatmentSystemRateWastesSludge() {
        return yearOutboundThirdPretreatmentSystemRateWastesSludge;
    }

    public void setYearOutboundThirdPretreatmentSystemRateWastesSludge(float yearOutboundThirdPretreatmentSystemRateWastesSludge) {
        this.yearOutboundThirdPretreatmentSystemRateWastesSludge = yearOutboundThirdPretreatmentSystemRateWastesSludge;
    }

    public float getYearOutboundThirdPretreatmentSystemRateWastesDistillation() {
        return yearOutboundThirdPretreatmentSystemRateWastesDistillation;
    }

    public void setYearOutboundThirdPretreatmentSystemRateWastesDistillation(float yearOutboundThirdPretreatmentSystemRateWastesDistillation) {
        this.yearOutboundThirdPretreatmentSystemRateWastesDistillation = yearOutboundThirdPretreatmentSystemRateWastesDistillation;
    }

    public float getYearOutboundThirdPretreatmentSystemRateWastesSuspension() {
        return yearOutboundThirdPretreatmentSystemRateWastesSuspension;
    }

    public void setYearOutboundThirdPretreatmentSystemRateWastesSuspension(float yearOutboundThirdPretreatmentSystemRateWastesSuspension) {
        this.yearOutboundThirdPretreatmentSystemRateWastesSuspension = yearOutboundThirdPretreatmentSystemRateWastesSuspension;
    }

    public float getYearOutboundThirdPretreatmentSystemRateWastesWasteLiquid() {
        return yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    }

    public void setYearOutboundThirdPretreatmentSystemRateWastesWasteLiquid(float yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid) {
        this.yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid = yearOutboundThirdPretreatmentSystemRateWastesWasteLiquid;
    }

    public float getYearOutboundThirdPretreatmentSystemRateMedicalWastes() {
        return yearOutboundThirdPretreatmentSystemRateMedicalWastes;
    }

    public void setYearOutboundThirdPretreatmentSystemRateMedicalWastes(float yearOutboundThirdPretreatmentSystemRateMedicalWastes) {
        this.yearOutboundThirdPretreatmentSystemRateMedicalWastes = yearOutboundThirdPretreatmentSystemRateMedicalWastes;
    }

    public float getTodayEquipmentA2StopTime() {
        return todayEquipmentA2StopTime;
    }

    public void setTodayEquipmentA2StopTime(float todayEquipmentA2StopTime) {
        this.todayEquipmentA2StopTime = todayEquipmentA2StopTime;
    }

    public float getTodayEquipmentB2StopTime() {
        return todayEquipmentB2StopTime;
    }

    public void setTodayEquipmentB2StopTime(float todayEquipmentB2StopTime) {
        this.todayEquipmentB2StopTime = todayEquipmentB2StopTime;
    }

    public float getTodayEquipmentPrepare2StopTime() {
        return todayEquipmentPrepare2StopTime;
    }

    public void setTodayEquipmentPrepare2StopTime(float todayEquipmentPrepare2StopTime) {
        this.todayEquipmentPrepare2StopTime = todayEquipmentPrepare2StopTime;
    }

    public float getTodayEquipmentSecondaryStopTime() {
        return todayEquipmentSecondaryStopTime;
    }

    public void setTodayEquipmentSecondaryStopTime(float todayEquipmentSecondaryStopTime) {
        this.todayEquipmentSecondaryStopTime = todayEquipmentSecondaryStopTime;
    }

    public float getTodayEquipmentThirdStopTime() {
        return todayEquipmentThirdStopTime;
    }

    public void setTodayEquipmentThirdStopTime(float todayEquipmentThirdStopTime) {
        this.todayEquipmentThirdStopTime = todayEquipmentThirdStopTime;
    }

    public float getMonthEquipmentA2StopTime() {
        return monthEquipmentA2StopTime;
    }

    public void setMonthEquipmentA2StopTime(float monthEquipmentA2StopTime) {
        this.monthEquipmentA2StopTime = monthEquipmentA2StopTime;
    }

    public float getMonthEquipmentB2StopTime() {
        return monthEquipmentB2StopTime;
    }

    public void setMonthEquipmentB2StopTime(float monthEquipmentB2StopTime) {
        this.monthEquipmentB2StopTime = monthEquipmentB2StopTime;
    }

    public float getMonthEquipmentPrepare2StopTime() {
        return monthEquipmentPrepare2StopTime;
    }

    public void setMonthEquipmentPrepare2StopTime(float monthEquipmentPrepare2StopTime) {
        this.monthEquipmentPrepare2StopTime = monthEquipmentPrepare2StopTime;
    }

    public float getMonthEquipmentSecondaryStopTime() {
        return monthEquipmentSecondaryStopTime;
    }

    public void setMonthEquipmentSecondaryStopTime(float monthEquipmentSecondaryStopTime) {
        this.monthEquipmentSecondaryStopTime = monthEquipmentSecondaryStopTime;
    }

    public float getMonthEquipmentThirdStopTime() {
        return monthEquipmentThirdStopTime;
    }

    public void setMonthEquipmentThirdStopTime(float monthEquipmentThirdStopTime) {
        this.monthEquipmentThirdStopTime = monthEquipmentThirdStopTime;
    }

    public float getYearEquipmentA2StopTime() {
        return yearEquipmentA2StopTime;
    }

    public void setYearEquipmentA2StopTime(float yearEquipmentA2StopTime) {
        this.yearEquipmentA2StopTime = yearEquipmentA2StopTime;
    }

    public float getYearEquipmentB2StopTime() {
        return yearEquipmentB2StopTime;
    }

    public void setYearEquipmentB2StopTime(float yearEquipmentB2StopTime) {
        this.yearEquipmentB2StopTime = yearEquipmentB2StopTime;
    }

    public float getYearEquipmentPrepare2StopTime() {
        return yearEquipmentPrepare2StopTime;
    }

    public void setYearEquipmentPrepare2StopTime(float yearEquipmentPrepare2StopTime) {
        this.yearEquipmentPrepare2StopTime = yearEquipmentPrepare2StopTime;
    }

    public float getYearEquipmentSecondaryStopTime() {
        return yearEquipmentSecondaryStopTime;
    }

    public void setYearEquipmentSecondaryStopTime(float yearEquipmentSecondaryStopTime) {
        this.yearEquipmentSecondaryStopTime = yearEquipmentSecondaryStopTime;
    }

    public float getYearEquipmentThirdStopTime() {
        return yearEquipmentThirdStopTime;
    }

    public void setYearEquipmentThirdStopTime(float yearEquipmentThirdStopTime) {
        this.yearEquipmentThirdStopTime = yearEquipmentThirdStopTime;
    }

    public float getTodayEquipmentA2RunningTime() {
        return todayEquipmentA2RunningTime;
    }

    public void setTodayEquipmentA2RunningTime(float todayEquipmentA2RunningTime) {
        this.todayEquipmentA2RunningTime = todayEquipmentA2RunningTime;
    }

    public float getTodayEquipmentB2RunningTime() {
        return todayEquipmentB2RunningTime;
    }

    public void setTodayEquipmentB2RunningTime(float todayEquipmentB2RunningTime) {
        this.todayEquipmentB2RunningTime = todayEquipmentB2RunningTime;
    }

    public float getTodayEquipmentPrepare2RunningTime() {
        return todayEquipmentPrepare2RunningTime;
    }

    public void setTodayEquipmentPrepare2RunningTime(float todayEquipmentPrepare2RunningTime) {
        this.todayEquipmentPrepare2RunningTime = todayEquipmentPrepare2RunningTime;
    }

    public float getTodayEquipmentSecondaryRunningTime() {
        return todayEquipmentSecondaryRunningTime;
    }

    public void setTodayEquipmentSecondaryRunningTime(float todayEquipmentSecondaryRunningTime) {
        this.todayEquipmentSecondaryRunningTime = todayEquipmentSecondaryRunningTime;
    }

    public float getTodayEquipmentThirdRunningTime() {
        return todayEquipmentThirdRunningTime;
    }

    public void setTodayEquipmentThirdRunningTime(float todayEquipmentThirdRunningTime) {
        this.todayEquipmentThirdRunningTime = todayEquipmentThirdRunningTime;
    }

    public float getMonthEquipmentA2RunningTime() {
        return monthEquipmentA2RunningTime;
    }

    public void setMonthEquipmentA2RunningTime(float monthEquipmentA2RunningTime) {
        this.monthEquipmentA2RunningTime = monthEquipmentA2RunningTime;
    }

    public float getMonthEquipmentB2RunningTime() {
        return monthEquipmentB2RunningTime;
    }

    public void setMonthEquipmentB2RunningTime(float monthEquipmentB2RunningTime) {
        this.monthEquipmentB2RunningTime = monthEquipmentB2RunningTime;
    }

    public float getMonthEquipmentPrepare2RunningTime() {
        return monthEquipmentPrepare2RunningTime;
    }

    public void setMonthEquipmentPrepare2RunningTime(float monthEquipmentPrepare2RunningTime) {
        this.monthEquipmentPrepare2RunningTime = monthEquipmentPrepare2RunningTime;
    }

    public float getMonthEquipmentSecondaryRunningTime() {
        return monthEquipmentSecondaryRunningTime;
    }

    public void setMonthEquipmentSecondaryRunningTime(float monthEquipmentSecondaryRunningTime) {
        this.monthEquipmentSecondaryRunningTime = monthEquipmentSecondaryRunningTime;
    }

    public float getMonthEquipmentThirdRunningTime() {
        return monthEquipmentThirdRunningTime;
    }

    public void setMonthEquipmentThirdRunningTime(float monthEquipmentThirdRunningTime) {
        this.monthEquipmentThirdRunningTime = monthEquipmentThirdRunningTime;
    }

    public float getYearEquipmentA2RunningTime() {
        return yearEquipmentA2RunningTime;
    }

    public void setYearEquipmentA2RunningTime(float yearEquipmentA2RunningTime) {
        this.yearEquipmentA2RunningTime = yearEquipmentA2RunningTime;
    }

    public float getYearEquipmentB2RunningTime() {
        return yearEquipmentB2RunningTime;
    }

    public void setYearEquipmentB2RunningTime(float yearEquipmentB2RunningTime) {
        this.yearEquipmentB2RunningTime = yearEquipmentB2RunningTime;
    }

    public float getYearEquipmentPrepare2RunningTime() {
        return yearEquipmentPrepare2RunningTime;
    }

    public void setYearEquipmentPrepare2RunningTime(float yearEquipmentPrepare2RunningTime) {
        this.yearEquipmentPrepare2RunningTime = yearEquipmentPrepare2RunningTime;
    }

    public float getYearEquipmentSecondaryRunningTime() {
        return yearEquipmentSecondaryRunningTime;
    }

    public void setYearEquipmentSecondaryRunningTime(float yearEquipmentSecondaryRunningTime) {
        this.yearEquipmentSecondaryRunningTime = yearEquipmentSecondaryRunningTime;
    }

    public float getYearEquipmentThirdRunningTime() {
        return yearEquipmentThirdRunningTime;
    }

    public void setYearEquipmentThirdRunningTime(float yearEquipmentThirdRunningTime) {
        this.yearEquipmentThirdRunningTime = yearEquipmentThirdRunningTime;
    }

    public float getTodayEquipmentA2RunningRate() {
        return todayEquipmentA2RunningRate;
    }

    public void setTodayEquipmentA2RunningRate(float todayEquipmentA2RunningRate) {
        this.todayEquipmentA2RunningRate = todayEquipmentA2RunningRate;
    }

    public float getTodayEquipmentB2RunningRate() {
        return todayEquipmentB2RunningRate;
    }

    public void setTodayEquipmentB2RunningRate(float todayEquipmentB2RunningRate) {
        this.todayEquipmentB2RunningRate = todayEquipmentB2RunningRate;
    }

    public float getTodayEquipmentPrepare2RunningRate() {
        return todayEquipmentPrepare2RunningRate;
    }

    public void setTodayEquipmentPrepare2RunningRate(float todayEquipmentPrepare2RunningRate) {
        this.todayEquipmentPrepare2RunningRate = todayEquipmentPrepare2RunningRate;
    }

    public float getTodayEquipmentSecondaryRunningRate() {
        return todayEquipmentSecondaryRunningRate;
    }

    public void setTodayEquipmentSecondaryRunningRate(float todayEquipmentSecondaryRunningRate) {
        this.todayEquipmentSecondaryRunningRate = todayEquipmentSecondaryRunningRate;
    }

    public float getTodayEquipmentThirdRunningRate() {
        return todayEquipmentThirdRunningRate;
    }

    public void setTodayEquipmentThirdRunningRate(float todayEquipmentThirdRunningRate) {
        this.todayEquipmentThirdRunningRate = todayEquipmentThirdRunningRate;
    }

    public float getMonthEquipmentA2RunningRate() {
        return monthEquipmentA2RunningRate;
    }

    public void setMonthEquipmentA2RunningRate(float monthEquipmentA2RunningRate) {
        this.monthEquipmentA2RunningRate = monthEquipmentA2RunningRate;
    }

    public float getMonthEquipmentB2RunningRate() {
        return monthEquipmentB2RunningRate;
    }

    public void setMonthEquipmentB2RunningRate(float monthEquipmentB2RunningRate) {
        this.monthEquipmentB2RunningRate = monthEquipmentB2RunningRate;
    }

    public float getMonthEquipmentPrepare2RunningRate() {
        return monthEquipmentPrepare2RunningRate;
    }

    public void setMonthEquipmentPrepare2RunningRate(float monthEquipmentPrepare2RunningRate) {
        this.monthEquipmentPrepare2RunningRate = monthEquipmentPrepare2RunningRate;
    }

    public float getMonthEquipmentSecondaryRunningRate() {
        return monthEquipmentSecondaryRunningRate;
    }

    public void setMonthEquipmentSecondaryRunningRate(float monthEquipmentSecondaryRunningRate) {
        this.monthEquipmentSecondaryRunningRate = monthEquipmentSecondaryRunningRate;
    }

    public float getMonthEquipmentThirdRunningRate() {
        return monthEquipmentThirdRunningRate;
    }

    public void setMonthEquipmentThirdRunningRate(float monthEquipmentThirdRunningRate) {
        this.monthEquipmentThirdRunningRate = monthEquipmentThirdRunningRate;
    }

    public float getYearEquipmentA2RunningRate() {
        return yearEquipmentA2RunningRate;
    }

    public void setYearEquipmentA2RunningRate(float yearEquipmentA2RunningRate) {
        this.yearEquipmentA2RunningRate = yearEquipmentA2RunningRate;
    }

    public float getYearEquipmentB2RunningRate() {
        return yearEquipmentB2RunningRate;
    }

    public void setYearEquipmentB2RunningRate(float yearEquipmentB2RunningRate) {
        this.yearEquipmentB2RunningRate = yearEquipmentB2RunningRate;
    }

    public float getYearEquipmentPrepare2RunningRate() {
        return yearEquipmentPrepare2RunningRate;
    }

    public void setYearEquipmentPrepare2RunningRate(float yearEquipmentPrepare2RunningRate) {
        this.yearEquipmentPrepare2RunningRate = yearEquipmentPrepare2RunningRate;
    }

    public float getYearEquipmentSecondaryRunningRate() {
        return yearEquipmentSecondaryRunningRate;
    }

    public void setYearEquipmentSecondaryRunningRate(float yearEquipmentSecondaryRunningRate) {
        this.yearEquipmentSecondaryRunningRate = yearEquipmentSecondaryRunningRate;
    }

    public float getYearEquipmentThirdRunningRate() {
        return yearEquipmentThirdRunningRate;
    }

    public void setYearEquipmentThirdRunningRate(float yearEquipmentThirdRunningRate) {
        this.yearEquipmentThirdRunningRate = yearEquipmentThirdRunningRate;
    }

    public float getTodayDisposalSecondarySlag() {
        return todayDisposalSecondarySlag;
    }

    public void setTodayDisposalSecondarySlag(float todayDisposalSecondarySlag) {
        this.todayDisposalSecondarySlag = todayDisposalSecondarySlag;
    }

    public float getTodayDisposalSecondaryAsh() {
        return todayDisposalSecondaryAsh;
    }

    public void setTodayDisposalSecondaryAsh(float todayDisposalSecondaryAsh) {
        this.todayDisposalSecondaryAsh = todayDisposalSecondaryAsh;
    }

    public float getTodayDisposalThirdSlag() {
        return todayDisposalThirdSlag;
    }

    public void setTodayDisposalThirdSlag(float todayDisposalThirdSlag) {
        this.todayDisposalThirdSlag = todayDisposalThirdSlag;
    }

    public float getTodayDisposalThirdAsh() {
        return todayDisposalThirdAsh;
    }

    public void setTodayDisposalThirdAsh(float todayDisposalThirdAsh) {
        this.todayDisposalThirdAsh = todayDisposalThirdAsh;
    }

    public float getMonthDisposalSecondarySlag() {
        return monthDisposalSecondarySlag;
    }

    public void setMonthDisposalSecondarySlag(float monthDisposalSecondarySlag) {
        this.monthDisposalSecondarySlag = monthDisposalSecondarySlag;
    }

    public float getMonthDisposalSecondaryAsh() {
        return monthDisposalSecondaryAsh;
    }

    public void setMonthDisposalSecondaryAsh(float monthDisposalSecondaryAsh) {
        this.monthDisposalSecondaryAsh = monthDisposalSecondaryAsh;
    }

    public float getMonthDisposalThirdSlag() {
        return monthDisposalThirdSlag;
    }

    public void setMonthDisposalThirdSlag(float monthDisposalThirdSlag) {
        this.monthDisposalThirdSlag = monthDisposalThirdSlag;
    }

    public float getMonthDisposalThirdAsh() {
        return monthDisposalThirdAsh;
    }

    public void setMonthDisposalThirdAsh(float monthDisposalThirdAsh) {
        this.monthDisposalThirdAsh = monthDisposalThirdAsh;
    }

    public float getYearDisposalSecondarySlag() {
        return yearDisposalSecondarySlag;
    }

    public void setYearDisposalSecondarySlag(float yearDisposalSecondarySlag) {
        this.yearDisposalSecondarySlag = yearDisposalSecondarySlag;
    }

    public float getYearDisposalSecondaryAsh() {
        return yearDisposalSecondaryAsh;
    }

    public void setYearDisposalSecondaryAsh(float yearDisposalSecondaryAsh) {
        this.yearDisposalSecondaryAsh = yearDisposalSecondaryAsh;
    }

    public float getYearDisposalThirdSlag() {
        return yearDisposalThirdSlag;
    }

    public void setYearDisposalThirdSlag(float yearDisposalThirdSlag) {
        this.yearDisposalThirdSlag = yearDisposalThirdSlag;
    }

    public float getYearDisposalThirdAsh() {
        return yearDisposalThirdAsh;
    }

    public void setYearDisposalThirdAsh(float yearDisposalThirdAsh) {
        this.yearDisposalThirdAsh = yearDisposalThirdAsh;
    }

    public String getParkingReason() {
        return parkingReason;
    }

    public void setParkingReason(String parkingReason) {
        this.parkingReason = parkingReason;
    }

    public String getOtherIssue() {
        return otherIssue;
    }

    public void setOtherIssue(String otherIssue) {
        this.otherIssue = otherIssue;
    }

    public List<InboundOrderItem> getInboundOrderItemList() {
        return inboundOrderItemList;
    }

    public void setInboundOrderItemList(List<InboundOrderItem> inboundOrderItemList) {
        this.inboundOrderItemList = inboundOrderItemList;
    }

    public List<OutboundOrder> getOutboundOrderA2List() {
        return outboundOrderA2List;
    }

    public void setOutboundOrderA2List(List<OutboundOrder> outboundOrderA2List) {
        this.outboundOrderA2List = outboundOrderA2List;
    }

    public List<OutboundOrder> getOutboundOrderB2List() {
        return outboundOrderB2List;
    }

    public void setOutboundOrderB2List(List<OutboundOrder> outboundOrderB2List) {
        this.outboundOrderB2List = outboundOrderB2List;
    }

    public List<OutboundOrder> getOutboundOrderPrepare2List() {
        return outboundOrderPrepare2List;
    }

    public void setOutboundOrderPrepare2List(List<OutboundOrder> outboundOrderPrepare2List) {
        this.outboundOrderPrepare2List = outboundOrderPrepare2List;
    }

    public List<OutboundOrder> getOutboundOrderThirdList() {
        return outboundOrderThirdList;
    }

    public void setOutboundOrderThirdList(List<OutboundOrder> outboundOrderThirdList) {
        this.outboundOrderThirdList = outboundOrderThirdList;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
