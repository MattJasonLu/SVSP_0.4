package com.jdlink.service;

import com.jdlink.domain.Produce.DocumentControl;

import java.util.List;

/**
 * Created by matt on 2018/7/8.
 */
public interface DocumentControlService {

    /**
     * 查找最新单据号
     */
    List<DocumentControl> getDocument();

}
