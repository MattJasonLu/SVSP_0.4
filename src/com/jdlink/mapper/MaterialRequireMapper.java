package com.jdlink.mapper;

import com.jdlink.domain.MixingElement;
import com.jdlink.domain.Page;
import com.jdlink.domain.Produce.MaterialRequire;
import com.jdlink.domain.Produce.MaterialRequireItem;
import com.jdlink.domain.Wastes;

import java.util.List;

public interface MaterialRequireMapper {
    int total();
     void  addMix(MaterialRequire materialRequire);
      List<String> check();//ch查找最新的配伍编号
     List<MaterialRequire> list(String materialRequireId);
   MaterialRequire getByMrId(String materialRequireId );
    void  approval(String id,String remarks);
    void submit(String id);
    void cancel(String id);
    void  back(String id,String remarks);
    void updatemarketPurchases(String id,float marketPurchases);
    List<MaterialRequire>getMaterialList(Page page);
     List<MaterialRequireItem> getMaterialRequireById(String materialRequireId);
     void  updateMaterialRequireItem(MaterialRequireItem materialRequireItem);
     void updateMaterialRequire(MaterialRequire materialRequire);
 MaterialRequire  getMaterialRequireByMaterialRequireId(String materialRequireId);
 List<MaterialRequire> searchMaterialRequire(MaterialRequire materialRequire);
 int searchMaterialRequireCount(MaterialRequire materialRequire);
List<String> searchMaterialRequireItem(MaterialRequireItem materialRequireItem);
int searchMaterialRequireItemCount(MaterialRequireItem materialRequireItem);
}
