package com.jdlink.service.produce;

import com.jdlink.domain.Approval.ApprovalNode;
import com.jdlink.domain.Approval.ApprovalProcess;
import com.jdlink.domain.Produce.Organization;

import java.util.Date;
import java.util.List;

public interface ApprovalManageService {

    List<ApprovalProcess> search(ApprovalProcess approvalProcess);

    int searchTotal(ApprovalProcess approvalProcess);

    ApprovalProcess getApprovalProcessByOrderId(String orderId);

    ApprovalNode getNodeByIdAndRoleId(int id,String roleId);

    void updateApprovalById(String id, int stateId, String approvalAdvice, String userName, Date date);

    List<Organization> getUrlList();

    ApprovalProcess getApprovalProcessModelById(int id);

    void deleteModelById(int id);

    void updateModelProcessById(ApprovalProcess approvalProcess);

    void addApprovalModel(ApprovalProcess approvalProcess);

    void updateApprovalProcessModelUrlById(ApprovalProcess approvalProcess);

    ApprovalProcess getModelProcessByUrl(String url);

    String publicSubmit(String orderId,String userName,String url,String roleId);

    void addApprovalFlow(ApprovalProcess approvalProcess);

    ApprovalProcess getNewestApprovalProcessByCreateTime();

    void updateApprovalNode(ApprovalNode approvalNode);

    ApprovalNode getApprovalNodeByNullApprovalPId(int approvalProcessId,int roleId);

    List<ApprovalProcess> getOrderIdAndUrlByRoleId(ApprovalProcess approvalProcess);

    int getOrderIdAndUrlByRoleIdCount(ApprovalProcess approvalProcess);

    ApprovalNode getApprovalNodeByOrderIdAndRoleId(String orderId,int roleId);

    ApprovalNode  getApprovalNodeByPNodeIdAndApprovalProcessId(int approvalP0rocessId,String approvalPId);

    ApprovalNode selectSupremeNodeByOrderId(String orderId);

    String publicBack(String orderId,int  roleId,String approvalAdvice,int radio);

    ApprovalNode getApprovalNodeById(String id);

    ApprovalProcess getApprovalProcessFlowByOrderId(String orderId);
}
