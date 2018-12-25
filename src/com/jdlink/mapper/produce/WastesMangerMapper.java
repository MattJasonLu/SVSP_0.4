package com.jdlink.mapper.produce;

import com.jdlink.domain.Category;
import com.jdlink.domain.Characteristic;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.WasteInto;
import com.jdlink.domain.WastesInfo;

import java.util.List;

public interface WastesMangerMapper {

    List<WastesInfo>  list(Page page);

    int totalWastesMangerRecord();

    List<Category> getWastesCategoryList();

    List<Characteristic> getWastesCharacteristicList();

    void addWastesManger(WastesInfo wastesInfo);

    void removeWastesManger(int id);

    WastesInfo getWastesMangerById(int id);

    void updateWastesManger(WastesInfo wastesInfo);
}
