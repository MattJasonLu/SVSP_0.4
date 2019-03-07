package com.jdlink.mapper.produce;

import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;

import java.util.List;

/**
 * 审批流管理
 */
public interface ApprovalManageMapper {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);

    List<Organization> getUrlList();
}
