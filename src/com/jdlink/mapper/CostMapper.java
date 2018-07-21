package com.jdlink.mapper;

import com.jdlink.domain.Cost;
import org.apache.ibatis.annotations.Param;
import java.util.List;

/**
 * Created by matt on 2018/4/23.
 */
public interface CostMapper {

    void add(Cost cost);

    void update(Cost cost);

    void levelUp(Cost cost);//@Param(value="cost")

    List<Cost> list();

    List<Cost> getByKeyword(String keyword);

    int count();

    Cost getById(String costId);

    void setStateDisabled(String costId);

    void changeEndDate(Cost cost);
}
