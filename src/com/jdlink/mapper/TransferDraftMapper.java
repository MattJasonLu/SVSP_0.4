package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.TransferDraft;

import java.util.List;

/**
 * Created by matt on 2018/8/2.
 * 转移联单映射
 */
public interface TransferDraftMapper {
    /**
     * 增加转移联单
     * @param transferDraft 转移联单
     */
    void add(TransferDraft transferDraft);

    /**
     * 设置状态为已作废
     * @param id 联单编号
     */
    void setStateInvalid(String id);

    /**
     * 设置状态为待审批
     * @param id 联单编号
     */
    void setStateToExamine(String id);

    /**
     * 通过联单编号获取联单对象
     * @param id 联单编号
     * @return 联单对象
     */
    TransferDraft getById(String id);

    /**
     * 更新联单对象
     * @param transferDraft 联单对象
     */
    void update(TransferDraft transferDraft);

    /**
     * 列出所有联单
     * @return 联单列表
     */
    List<TransferDraft> list(Page page);

    /**
     * 获取联单数量
     * @return 联单数量
     */
    int count();

    /**
     * 查询数据
     * @param transferDraft 查询信息
     * @return 结果
     */
    List<TransferDraft> search(TransferDraft transferDraft);

    /**
     * 查询数量
     * @return 查询数量
     */
    int searchCount(TransferDraft transferDraft);

}
