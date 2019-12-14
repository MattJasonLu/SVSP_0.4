package com.jdlink.mapper.produce;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;
import com.jdlink.domain.User;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * 审批流管理
 */
public interface ApprovalManageMapper {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);

    ApprovalProcess getApprovalProcessByOrderId(String orderId);

    ApprovalNode getNodeByIdAndRoleId(int id,String roleId);

    void updateApprovalById(String id, int stateId, String approvalAdvice, String userName, Date date);

    void updateApprovalProcessById(ApprovalProcess approvalProcess);

    List<Organization> getUrlList();

    ApprovalProcess getApprovalProcessModelById(int id);

    void deleteModelNotesByApprovalProcessId(int id);

    void deleteModelProcessByApprovalProcessId(int id);

    void addApprovalNode(ApprovalNode approvalNode);

    void addApprovalProcess(ApprovalProcess approvalProcess);

    void deleteUrlByApprovalProcessId(int id);

    void addApprovalProcessModelUrl(ApprovalProcess approvalProcess);

    ApprovalProcess getModelProcessByUrl(String url);

    void addApprovalFlow(ApprovalProcess approvalProcess);

    ApprovalProcess getNewestApprovalProcessByCreateTime();

    void updateApprovalNode(ApprovalNode approvalNode);

    ApprovalNode getApprovalNodeByNullApprovalPId(int approvalProcessId,int roleId);

    List<ApprovalProcess> getOrderIdAndUrlByRoleId(ApprovalProcess approvalProcess);

    int getOrderIdAndUrlByRoleIdCount(ApprovalProcess approvalProcess);

    ApprovalNode getApprovalNodeByOrderIdAndRoleId(String orderId,int roleId);

    ApprovalNode  getApprovalNodeByPNodeIdAndApprovalProcessId(int approvalP0rocessId,String approvalPId);

    ApprovalNode selectSupremeNodeByOrderId(String orderId);

    ApprovalNode getApprovalNodeById(String id);

    ApprovalProcess getApprovalProcessFlowByOrderId(String orderId);

}
