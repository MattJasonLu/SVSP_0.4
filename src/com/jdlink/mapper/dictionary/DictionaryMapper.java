package com.jdlink.mapper.dictionary;

import com.jdlink.domain.Dictionary.DataDictionary;
import com.jdlink.domain.Dictionary.DataDictionaryItem;
import com.jdlink.domain.Page;

import java.util.Dictionary;
import java.util.List;

public interface DictionaryMapper {

    /*
    * 查询主表个数，便于赋值主键
    * */
    int getIdCount();

    /*主表新增*/
    void  addDataDictionary(DataDictionary dataDictionary);

    /**
     * 子表新增
     */
    void  addDataDictionaryItem(DataDictionaryItem dataDictionaryItem);

    /*
    * 根据创建时间寻找最新的主表编号*/

    int getNewestId();

    /**
     * 加载页面数据
     */
    List<DataDictionary> getDictionariesDataList(Page page);

    /**
     * 根据主键获取字典信息
     */
    DataDictionary getDataDictionaryById(String id);

    /**
     * 主表更新
     */
    void updateDataDictionary(DataDictionary dataDictionary);

    /**
     * 更新后删除字表
     */
    void  deleteDataDictionaryById(int id);

    /**
     * 数据字典查询
     *
     */
    List<DataDictionary> searchDictionary(DataDictionary dataDictionary);

    /**
     * 查看计数
     *
     */
    int searchDictionaryCount(DataDictionary dataDictionary);

    List<DataDictionaryItem>getSelectListByDataDictionary(int id);

  int getdatadictionaryitemIdByName(String name,int id);

  void importDictionaryExcel(DataDictionary dataDictionary);

  List<String> getDictionaryTypeListFromDataDictionary();
}
