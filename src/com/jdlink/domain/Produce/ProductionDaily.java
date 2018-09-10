package com.jdlink.domain.Produce;

import java.util.Date;

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
    private float toDayInboundMedicalWastesDirectDisposal;
    /**
     * 本日蒸煮医废
     */
    private float toDayInboundMedicalWastesCooking;
    /**
     * 本日误差量
     */
    private float toDayInboundMedicalWastesErrorNumber;
    /**
     * 本日蒸煮后重量
     */
    private float toDayInboundMedicalWastesAfterCooking;
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
    private float toDayOutboundMedicalWastesDirectDisposal;
    /**
     * 本日蒸煮医废
     */
    private float toDayOutboundMedicalWastesCooking;
    /**
     * 本日误差量
     */
    private float toDayOutboundMedicalWastesErrorNumber;
    /**
     * 本日蒸煮后重量
     */
    private float toDayOutboundMedicalWastesAfterCooking;
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
    private float toDayDisposalMedicalWastesDisposalDirect;
    /**
     * 本日蒸煮医废
     */
    private float toDayDisposalMedicalWastesCooking;
    /**
     * 本日误差量
     */
    private float toDayDisposalMedicalWastesErrorNumber;
    /**
     * 本日蒸煮后重量
     */
    private float toDayDisposalMedicalWastesAfterCooking;
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
    private float todayDisposalThirdSecondaryAuxiliarySlagBag;
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
    private float monthDisposalThirdSecondaryAuxiliarySlagBag;
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
    private float yearDisposalThirdSecondaryAuxiliarySlagBag;
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
    private float todayAverageDisposalThirdSecondaryAuxiliarySlagBag;
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
    private float monthAverageDisposalThirdSecondaryAuxiliarySlagBag;
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

}
