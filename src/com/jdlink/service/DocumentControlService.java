package com.jdlink.service;

import com.jdlink.domain.Produce.DocumentControl;

import java.util.List;

/**
 * Created by matt on 2018/7/8.
 */
public interface DocumentControlService {

    /**
     * 列出所有的受控文档
     * @return 受控文档列表
     */
    List<DocumentControl> list(DocumentControl documentControl);

    /**
     * 计算受控文档的数量
     * @param documentControl 参数
     * @return 数量
     */
    int count(DocumentControl documentControl);

    /**
     * 增加受控文档
     * @param documentControl 受控文档
     */
    void add(DocumentControl documentControl);

    /**
     * 作废
     * @param ID 编号
     */
    void setInvalid(String ID);

    /**
     * 设置生效
     * @param ID 编号
     */
    void setEffective(String ID);

    /**
     * 设置失效
     * @param ID 编号
     */
    void setUnEffective(String ID);

}
