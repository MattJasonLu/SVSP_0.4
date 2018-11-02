package com.jdlink.mapper;

import com.jdlink.domain.Produce.DocumentControl;

import java.util.List;


/**
 * Created by Leon on 2018/8/30.
 */
public interface DocumentControlMapper {

    /**
     * 查找最新单据号
     */
    List<DocumentControl> getDocument();

}
