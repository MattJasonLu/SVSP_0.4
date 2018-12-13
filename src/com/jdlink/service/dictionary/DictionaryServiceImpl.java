package com.jdlink.service.dictionary;

import com.jdlink.domain.Dictionary.DataDictionary;
import com.jdlink.domain.Dictionary.DataDictionaryItem;
import com.jdlink.domain.Page;
import com.jdlink.mapper.dictionary.DictionaryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Dictionary;
import java.util.List;

@Service
public class DictionaryServiceImpl implements DictionaryService
{
    @Autowired
    DictionaryMapper dictionaryMapper;
    @Override
    public int getIdCount() {
        return dictionaryMapper.getIdCount();
    }

    @Override
    public void addDataDictionary(DataDictionary dataDictionary) {
        dictionaryMapper.addDataDictionary(dataDictionary);
    }

    @Override
    public void addDataDictionaryItem(DataDictionaryItem dataDictionaryItem) {
        dictionaryMapper.addDataDictionaryItem(dataDictionaryItem);
    }

    @Override
    public int getNewestId() {
        return dictionaryMapper.getNewestId();
    }

    @Override
    public List<DataDictionary> getDictionariesDataList(Page page) {
        return dictionaryMapper.getDictionariesDataList(page);
    }

    @Override
    public DataDictionary getDataDictionaryById(String id) {
        return dictionaryMapper.getDataDictionaryById(id);
    }

    @Override
    public void updateDataDictionary(DataDictionary dataDictionary) {
        dictionaryMapper.updateDataDictionary(dataDictionary);
    }

    @Override
    public void deleteDataDictionaryById(int id) {
        dictionaryMapper.deleteDataDictionaryById(id);
    }

    @Override
    public List<DataDictionary> searchDictionary(DataDictionary dataDictionary) {
        return dictionaryMapper.searchDictionary(dataDictionary);
    }

    @Override
    public int searchDictionaryCount(DataDictionary dataDictionary) {
        return dictionaryMapper.searchDictionaryCount(dataDictionary);
    }

    @Override
    public List<DataDictionaryItem> getSelectListByDataDictionary(int id) {
        return dictionaryMapper.getSelectListByDataDictionary(id);
    }

    @Override
    public int getdatadictionaryitemIdByName(String name,int id) {
        return dictionaryMapper.getdatadictionaryitemIdByName(name,id);
    }

    @Override
    public void importDictionaryExcel(DataDictionary dataDictionary) {
        dictionaryMapper.importDictionaryExcel(dataDictionary);
    }

    @Override
    public List<String> getDictionaryTypeListFromDataDictionary() {
        return dictionaryMapper.getDictionaryTypeListFromDataDictionary();
    }
}
