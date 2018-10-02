package com.jdlink.service;


import com.jdlink.domain.Wastes;

import java.util.List;


public interface WastesService {

    /**
     * 查询全部数据
     * @return
     */
   List<Wastes> list();

    /**
     * 增加危废
     * @param wastes
     */
   void add(Wastes wastes);

}
