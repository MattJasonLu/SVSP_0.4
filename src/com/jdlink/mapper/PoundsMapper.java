package com.jdlink.mapper;

import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.Pounds;

import java.util.List;

public interface PoundsMapper {

    int count();

    List<Pounds> listPage(Page page);

    Pounds getById(String id);

    void add(Pounds pounds);

    void update(Pounds pounds);

    int searchCount(Pounds pounds);

    List<Pounds> search(Pounds pounds);

    int countById(String id);

    /**
     * 根据客户名称获取ID
     * @param name
     * @return
     */
    String getClientIdByName(String name);

    /**
     * 更新作废状态
     * @param id
     */
    void invalid(String id);

    /**
     * 更新打印时间
     * @param id
     */
    void printTime(String id);

    /**
     * 通过转移联单Id获取对象
     * @param transferId
     * @return
     */
    Pounds getByTransferId(String transferId);

    /**
     * 获取全部数据
     * @return
     */
    List<Pounds> list();

    /**
     * 清零打印时间
     * @param id
     */
    void resetPrintTime(String id);
}
