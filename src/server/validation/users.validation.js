import Joi from 'joi';

export default {
  signup: Joi.object({
    recaptcha_token: Joi.string().allow("").allow(null),
    customer_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    company_name: Joi.string().allow(''),
    fcm_token: Joi.string().allow("").allow(null),
    device_id:Joi.string().required(),
    device_type:Joi.string().required(),
  }),
  signin: Joi.object({
    recaptcha_token: Joi.string().allow("").allow(null),
    email: Joi.string().required(),
    password: Joi.string().required(),
    fcm_token: Joi.string().allow("").allow(null),
    device_id:Joi.string().required(),
    device_type:Joi.string().required(),
  }),
  forgotpasswordEmail: Joi.object({
    email: Joi.string().required(),
  }),
  checkOTP:Joi.object({
    email: Joi.string().required(),
    otp:Joi.string().required(),
  }),
  deleteCustomer:Joi.object({
    customerId: Joi.number().required()
  }),
  setPassword: Joi.object({
    emailToken: Joi.string().optional(),
    customer_id: Joi.number().required(),
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
  getCustomerById: Joi.object({
    customerId: Joi.string().required(),
  }),
  getCustomerTemporaryAddress: Joi.object({
    customer_id: Joi.number().required(),
  }),


  updateCustomer: Joi.object({
    customer_id: Joi.number().required(),
    customer_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    email: Joi.string().required(),
    // password: Joi.string().required(),
    company_name: Joi.string().allow('').allow(null),
  }),
  uploadProfileImage: Joi.object({
 
    customer_id: Joi.number().required(),
    file:Joi.object().required(),
    
  }),
  updateCustomerSetting: Joi.object({
    is_notification_active: Joi.boolean().optional(),
    language: Joi.string().optional(),
    customer_id: Joi.number().required(),
    fcm_token:Joi.string().optional(),
    is_email_active: Joi.boolean().optional(),
  }),
  socialMediaLogin: Joi.object({
    email: Joi.string().required(),
    fcm_token: Joi.string().allow("").allow(null),
    customer_name: Joi.string().required(),
    type:Joi.string().required(),
    login_type:Joi.string().required().valid('google','facebook','apple'),
    sso_id:Joi.string().required()
  }),
  socialMediaSignup: Joi.object({
    email: Joi.string().required(),
    fcm_token: Joi.string().allow("").allow(null),
    customer_name: Joi.string().required(),
    device_id:Joi.string().required(),
    device_type:Joi.string().required(),
  }),
  deleteRequest:Joi.object({
    email: Joi.string().email().required(),
    customer_id: Joi.number().required(),
    reason: Joi.string().required(),
  }),
  shareOrder:Joi.object({
    orderId: Joi.number().required(),
    receiver_email: Joi.string().email().required(),
    subject: Joi.string().required(),
    from: Joi.string().required(),
    to: Joi.string().required(),
  }),
  signOut:Joi.object({
    customer_id: Joi.number().required(),
    fcm_token: Joi.string().required().allow("").allow(null),
  }),
  getCustomers: Joi.object({
    offset: Joi.number().required(),
    limit: Joi.number().required(),
  }),
  getOrdersByPartner: Joi.object({
    offset: Joi.number().required(),
    limit: Joi.number().required(),
    partner_id: Joi.number().required(),
    customer_id: Joi.number().required(),
  }),
  updatePassword: Joi.object({
    code: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
};
