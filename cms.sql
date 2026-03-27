--Insert Default Values

INSERT INTO tbl_roles(id, name, description, slug, is_active, is_deleted, created_on, created_by) VALUES (1, 'Super Admin', 'Default user type. Has the full administration power', 'super_admin', 1, 0, '2023-07-25 05:50:14', 1);
INSERT INTO tbl_roles(id, name, description, slug, is_active, is_deleted, created_on, created_by,tenant_id) VALUES (2, 'Admin', 'Default user type. Has the full administration power', 'admin', 1, 0, '2025-03-14 11:09:12', 1,1);

INSERT INTO tbl_languages(id,language_name,language_code,image_path,json_path,is_status,is_default,created_by,created_on,is_deleted) VALUES (1,'English', 'en', '/public/img/in.jpeg','locales/en.json', 1, 1,1, 'current_time',0)

INSERT INTO tbl_languages(id,language_name,language_code,image_path,json_path,is_status,is_default,created_by,created_on,is_deleted) VALUES (2,'Spanish', 'es','/public/img/sp.jpeg', 'locales/es.json', 1, 0,1, 'current_time',0)

INSERT INTO tbl_languages(id,language_name,language_code,image_path,json_path,is_status,is_default,created_by,created_on,is_deleted) VALUES (3,'French', 'fr','/public/img/fr.jpeg', 'locales/fr.json', 1, 0,1, 'current_time',0)

INSERT INTO tbl_languages(id,language_name,language_code,image_path,json_path,is_status,is_default,created_by,created_on,is_deleted) VALUES (4,'Russian', 'ru','/public/img/russia.svg', 'locales/ru.json', 1, 0,1, 'current_time',0)

INSERT INTO tbl_users(id, role_id, first_name, last_name, email, username, password, mobile_no, is_active, created_on, created_by, is_deleted, default_language_id,tenant_id)	VALUES (1, 2, 'Ragfish', 'AI', 'ragfishai@gmail.com', 'Admin', '$2a$14$3kdNuP2Fo/SBopGK9e/9ReBa8uq82vMM5Ko2jnbLpuPb6qxqgR0x2', '9999999999', 1, '2023-11-24 14:56:12',1, 0, 1,1);


INSERT INTO tbl_general_settings(id, logo_path, expand_logo_path, date_format, time_format,language_id,time_zone,tenant_id) VALUES (1,'/public/img/logo1.svg', '/public/img/logo-bg.svg', 'dd mmm yyyy', '12',1,'Asia/Kolkata',1);

INSERT INTO tbl_email_configurations (id,selected_type) VALUES (1,'environment')

INSERT INTO tbl_storage_types(id, local, selected_type) VALUES (1, 'storage', 'aws');

--Default Insert Menu value

--Chat Module
--  truncate table tbl_assistants
-- truncate table tbl_module_permissions
INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES (1, 'Chat', 1, 1, 'current_time', 0, 0, 1, '/public/img/chat.svg', '', 1, 'left',0,0);

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES (2, 'Agents', 1, 1, 'current_time', 0, 0, 1, '/public/img/create.svg', '', 2, 'left',0,0);

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(3, 'Users', 1, 1, 'current_time', 0, 0, 1, '/public/img/member_new.svg', 'Admin manages user profiles, including adding new users and assigning them to specific groups.', 3, 'left',0,0);

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES (4, 'Channels', 1, 1, 'current_time', 0, 0, 1, '/public/img/data.svg', '', 4, 'left',0,0);

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(5, 'Settings', 1, 1, 'current_time', 0, 0, 1, '/public/img/settings.svg', 'Check relevant boxes for providing access control to this role, in this settings.', 5, 'left',0,1);


INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(6, 'Chat', 1, 1, 'current_time', 0, 1, 1, '/public/img/chat.svg', '', 6, 'tab',1,0);

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(7, 'Agents', 1, 1, 'current_time', 0, 2, 1, '/public/img/chat.svg', '', 7, 'tab',1,0);
INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(8, 'Users', 1, 1, 'current_time', 0, 3, 0, '/public/img/accord-member.svg', 'Add member profiles, map them to a member group and manage the entire list of member profiles. ', 8, 'tab',0,0);


INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(9, 'Users Group', 1, 1, 'current_time', 0, 3, 0, '/public/img/group.svg', 'Create groups and categorize members into various groups like Elite Members or Favorite Members', 9, 'tab',0,0);

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(10, 'Channels', 1, 1, '2023-03-14 11:09:12', 0, 4, 0, '/public/img/accord-channels.svg', 'Easily create and manage diverse content types using Spurt CMS Admin.', 10, 'tab',1,0);


INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(11, 'My Account', 1, 1, 'current_time', 0, 5, 1, '/public/img/profile.svg', 'Here you can change your email id and password.', 11, 'tab',1,0)


INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(12, 'Security', 1, 1, 'current_time', 0, 5, 1, '/public/img/security.svg', 'To protech your account, you can change your password at regular intervals.', 12, 'tab',1,0)

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(13, 'Roles & Permissions', 1, 1, 'current_time', 0, 5, 0, '/public/img/roles-permision.svg', 'Create different admin roles and assign permissions to them based on their responsibilities.', 13, 'tab',1,0)

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(14, 'Team', 1, 1, 'current_time', 0, 5, 0, '/public/img/team.svg', 'Create a team of different admin roles.', 14, 'tab',1,0)

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(15, 'Email', 1, 1, 'current_time', 0, 5, 0, '/public/img/email.svg', 'Create and Maintain Email Templates that are to be sent to users in different scenarios.', 15, 'tab',1,0)

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(16, 'AI Settingsl', 1, 1, 'current_time', 0, 5, 1, '/public/img/settings.svg', '', 16, 'tab',1,0)

update tbl_modules set module_name='AI Settings' where id=16
INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(17, 'General Settings', 1, 1, 'current_time', 0, 5, 0, '/public/img/settings.svg', '', 17, 'tab',1,0)

INSERT INTO tbl_modules(id, module_name, is_active, created_by, created_on, default_module, parent_id, assign_permission, icon_path, description, order_index, menu_type,full_access_permission,group_flg) VALUES(18, 'Languages', 1, 1, 'current_time', 0, 5, 0, '/public/img/language.svg', '', 18, 'tab',1,1)
-------------End----------


INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (1, '/chat', 'Chat', '', 6, 1, 'current_time', 1, 0, 1, 1, 'chat')


INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (2, '/agents', 'Agents', '', 7, 1, 'current_time', 1, 0, 1, 2, 'agents')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (3, '/usergroup/', 'View', 'Give view access to the member group', 9, 1, 'current_time', 0, 0,1, 3, 'view')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (4, '/usergroup/newgroup', 'Create', 'Give create access to the member group', 9, 1, 'current_time', 0, 0, 1, 4, 'create')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (5, '/usergroup/updategroup', 'Update', 'Give update access to the member group', 9, 1, 'current_time', 0, 0, 1, 5, 'update')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (6, '/usergroup/deletegroup', 'Delete', 'Give delete access to the member group', 9, 1, 'current_time', 0, 0, 1, 6, 'delete')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (7, '/user/', 'View', 'Give view access to the Member', 8, 1, 'current_time', 0, 0, 1, 7, 'view')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (8, '/user/newmember', 'Create', 'Give create access to the Member', 8, 1, 'current_time', 0, 0, 1, 8, 'create')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (9, '/user/updatemember', 'Update', 'Give update access to the Member', 8, 1, 'current_time', 0, 0, 1, 9, 'update')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (10, '/user/deletemember', 'Delete', 'Give delete access to the Member', 8, 1, 'current_time', 0, 0, 1, 10, 'delete')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (11, '/channels', 'Channels', '', 10, 1, 'current_time', 1, 0, 1, 11, 'channels')
INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (12, '/settings/roles/', 'Roles & Permission', 'Create and manage additional roles based on the needs for their tasks and activities in the control panel.', 13, 1, 'current_time', 1, 0, 1, 12, 'roles')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (13, '/settings/users/userlist', 'Teams', 'Add users for assigning them roles, followed by assigning permissions for appropriate access to the CMS.', 14, 1, '2023-03-14 11:09:12', 1, 0, 1, 13, 'users')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (14, '/settings/emails', 'Email Templates', 'Add different languages here, for the Members to consume content in the language of preference on the website.', 15, 1, '2023-03-14 11:09:12', 1, 0, 1, 14, 'email')

INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (15, '/settings/aimodel/', 'AI Settings Settings', '', 16, 1, 'current_time', 1, 0, 1, 15, 'ai-settings')

update tabl_module_permissions set slug_name='ai-settings' where id=15
update tbl_module_permissions set display_name='AI Settings' where id=15
INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (16, '/settings/general-settings/', 'General Settings', 'Add different languages here, for the Members to consume content in the language of preference on the website.', 29, 1, 'current_time', 1, 0, 1, 16, 'data')


INSERT INTO tbl_module_permissions(id, route_name, display_name, description, module_id, created_by, created_on, full_access_permission, parent_id, assign_permission,order_index, slug_name) VALUES (17, '/settings/languages', 'Languages', 'Give full access to the languages', 41, 1, 'current_time', 1, 0, 1, 17, 'languages')
-------------End----------





INSERT INTO tbl_timezones(id,timezone) VALUES (1,'Africa/Cairo'),(2,'Africa/Johannesburg'),(3,'Africa/Lagos'),(4,'Africa/Nairobi'),(5,'America/Argentina/Buenos_Aires'),(6,'America/Chicago'),(7,'America/Denver'),(8,'America/Los_Angeles'),(9,'America/Mexico_City'),(10,'America/New_York'),(11,'America/Sao_Paulo'),(12,'Asia/Bangkok'),(13,'Asia/Dhaka'),(14,'Asia/Dubai'),(15,'Asia/Hong_Kong'),(16,'Asia/Jakarta'),(17,'Asia/Kolkata'),(18,'Asia/Manila'),(19,'Asia/Seoul'),(20,'Asia/Shanghai'),(21,'Asia/Singapore'),(22,'Asia/Tokyo'),(23,'Australia/Melbourne'),(24,'Australia/Sydney'),(25,'Europe/Amsterdam'),(26,'Europe/Berlin'),(27,'Europe/Istanbul'),(28,'Europe/London'),(29,'Europe/Madrid'),(30,'Europe/Moscow'),(31,'Europe/Paris'),(32,'Europe/Rome'),(33,'Pacific/Auckland'),(34,'Pacific/Honolulu')

--Email Default Template Insert
 
INSERT INTO tbl_email_templates(id, template_slug, template_subject, template_message, template_description, module_id, created_on, created_by, is_deleted, is_active,template_name,tenant_id)VALUES (1,'createuser', 'Confirm user registration', '<tr><td><p style="margin-left:0;">&nbsp;</p><h1 style="font-size: 20px; font-weight: bold;line-height: 27px;color:#000000; margin:0 0  12px 0;">Dear <strong>{FirstName}</strong>,</h1></td></tr><tr><td><p style="color:#000000;font-size:14px;">Congratulations! Your SpurtCMS account has been successfully created.</p><p style="color:#000000;font-size:14px;">Log in at</p><p  style="color:#000000;font-size:14px;">{Loginurl}</p><p  style="color:#000000;font-size:14px;margin:0 0 16px;">and start using your Admin Account.</p></td></tr><tr><td><p style="color:#000000;font-size:16px;line-height:normal;margin:0 0 12px;">Best Regards,</p><p style="color:#000000;font-size:16px;font-weight:500;line-height:24px;margin:0 0 16px;"><strong>Spurt CMS Admin</strong></p></td></tr>', 'Change Password: Enable this toggle to activate the Change Password email template, which confirms to users that their password has been successfully changed.', 0, 'current_time', 1, 0, 1,'Create Admin User',1);
 
INSERT INTO tbl_email_templates(id, template_slug, template_subject, template_message, template_description, module_id, created_on, created_by, is_deleted, is_active,template_name,tenant_id)VALUES (2, 'changepassword', 'New password', '<p>Hello,{firstname} your password updated Successfully. your new password:{password}</p>', 'Change Password: Change Password email template, which confirms to users that their password has been successfully changed.', 0, 'current_time', 1, 0, 1,'Change Password',1);
 
INSERT INTO tbl_email_templates(id, template_slug,template_subject,template_description,template_message,module_id,created_on,created_by,is_deleted,is_active,template_name,tenant_id)VALUES(3,'OTPGenerate','Email OTP','OTP email template, which sends a One-Time Password (OTP) to users for verification.','<tr><td><p style="margin-left:0;"><h1 style="font-size: 20px; font-weight: bold;line-height: 27px;color:#000000; margin:0 0  16px 0;">Dear {FirstName}</h1></td></tr><tr><td><p style="font-size: 14px; line-height: 24px; color: #000000;margin:0;">As requsted, here is your One-Time Password (OTP) to log in to SpurtCMS:</p><h3 style="font-size: 20px; line-height:1; font-weight: bold; color: #000000; margin:20px 0;">OTP:{OTP}</h3><p style="font-size: 14px; line-height: 24px; color: #000000;margin:0 0 20px 0;">Please use this OTP within <span style="font-size: 16px; font-weight:bold;">{Expirytime}</span> to complete the login process. If you do not log in within this time frame, you may request a new OTP.</p><p style="font-size: 14px; line-height: 24px; color: #000000;margin:0 0 20px 0;">If you encounter any issue or need assistance, feel free to reach out to our support team.</p><p style="font-size: 14px; line-height: 24px; color: #000000;margin:0 0 20px 0;">Thank you for using <span style="font-size: 16px;">SpurtCMS.</span></p><p style="font-size: 16px; line-height: normal; color: #000000;margin:0 0 15px 0;">Best Regards,</p><p style="font-size: 16px; line-height:normal; color: #000000;margin:0 0 10px 0;"><b>SpurtCMS Team</b></p></td></tr>',0,'2023-11-24 14:56:12',1, 0,1,'OTP Generation',1)
 
INSERT INTO tbl_email_templates(id, template_slug,template_subject,template_description,template_message,module_id,created_on,created_by,is_deleted,is_active,template_name,tenant_id)VALUES(4,'Forgot Password','Reset password link','Forgot Password email template, which sends a confirmation and reset password link to users.', '<tr><td style="padding:2.5rem 1.5rem 0rem;"><h2 style="font-family: "Lexend", sans-serif;font-size: .875rem;font-weight: 400;line-height: 1.125rem;letter-spacing: 0em;text-align: left;color: #525252;margin-bottom: 1.25rem;">Dear <span style="font-family: "Lexend", sans-serif;font-size: 1rem;font-weight: 500;line-height: 20px;letter-spacing: 0em;text-align: left;color: #152027;">{FirstName},</span></h2></td></tr><tr><td style="padding: 0rem 1.5rem;"><p style="font-family: "Lexend", sans-serif;font-size: 14px;font-weight: 400;line-height: 18px;letter-spacing: 0em;text-align: left;color: #525252;margin: 0;">You recently requested to reset your password for spurtCMS admin login.</p><p style="font-family: "Lexend", sans-serif;font-size: 14px;font-weight: 400;line-height: 18px;letter-spacing: 0em;text-align: left;color: #525252;margin-bottom: 1.5rem">Click the link below to reset it.</p></td></tr><tr><td style="padding: 0rem 1.5rem;"><a href="{Passwordurl}" style="color: #2FACD6;text-decoration: underline;">{Passwordurlpath}</a><p class="mb-1" style="font-family: "Lexend", sans-serif;font-size: 14px;font-weight: 400;line-height: 18px;letter-spacing: 0em;text-align: left;color: #525252;">If you did not request a password reset, please ignore this email.</p></td></tr><tr><td style=" padding: 0rem 1.5rem 2.5rem;"><h2 style="font-family: "Lexend", sans-serif;font-size: .75rem;font-weight: 400;line-height: .9375rem;letter-spacing: 0em;text-align: left;color: #525252;margin-bottom: .5rem;">Best Regards,</h2><p style="font-family: "Lexend", sans-serif;font-size: .875rem;font-weight: 400;line-height: 1.125rem;letter-spacing: 0em;text-align: left;color: #152027;">  Spurt CMS Admin</p></td></tr></tr>' ,0,'2023-11-24 14:56:12',1, 0,1,'Forgot Password',1)
 
INSERT INTO tbl_email_templates(id, template_slug,template_subject,template_description,template_message,module_id,created_on,created_by,is_deleted,is_active,template_name,tenant_id)VALUES(5,'Createmember','Member registration','Notifies member that they have been created as a member on the platform.','<tr><td><p style="margin-left:0;">&nbsp;</p><h1 style="font-size: 20px; font-weight: bold;line-height: 27px;color:#000000; margin:0 0  12px 0;">Dear <strong>{FirstName}</strong>,</h1></td></tr><tr><td><p style="color:#000000;font-size:14px;">Were glad to have you as a member at spurtCMS. Your membership has been confirmed.</p><p style="color:#000000;font-size:14px;">Log in at</p><p  style="color:#000000;font-size:14px;">{Loginurl}</p><p  style="color:#000000;font-size:14px;margin:0 0 16px;">and indulge in Member related activities and explore our exclusive content.</p></td></tr><tr><td><p style="color:#000000;font-size:16px;line-height:normal;margin:0 0 12px;">Best Regards,</p><p style="color:#000000;font-size:16px;font-weight:500;line-height:24px;margin:0 0 16px;"><strong>Spurt CMS Admin</strong></p></td></tr>' ,6,'2023-11-24 14:56:12',1, 0,1,'Send Member Login credentials',1)
 

 
INSERT INTO tbl_email_templates(id, template_slug,template_subject,template_description,template_message,module_id,created_on,created_by,is_deleted,is_active,template_name,tenant_id)VALUES(12,'Logined successfully','User login successfully','User conformation account is logged in successfully','<tr><td><p style="margin-left:0;">&nbsp;</p><h1 style="font-size: 20px; font-weight: bold;line-height: 27px;color:#000000; margin:0 0  12px 0;">Dear <strong>{FirstName}</strong>,</h1></td></tr><tr><td><p style="color:#000000;font-size:14px;">Congratulations! Your SpurtCMS account has been logged in successfully.</p><p  style="color:#000000;font-size:14px;margin:0 0 16px;">Start using your Admin Account.</p></td></tr><tr><td><p style="color:#000000;font-size:16px;line-height:normal;margin:0 0 12px;">Best Regards,</p><p style="color:#000000;font-size:16px;font-weight:500;line-height:24px;margin:0 0 16px;"><strong>Spurt CMS Admin</strong></p></td></tr>',0,'2023-11-24 14:56:12',1, 0,1,'Send User Logined Email',1)
 
INSERT INTO tbl_email_templates(id,template_slug,template_subject,template_description,template_message,module_id,created_on,created_by,is_deleted,is_active,template_name,tenant_id)VALUES(13,'Superadminnotification','New User Registration Alert','For the Super Admin to receive notification when Tenant have been registered as a SpurtCMS platform. ','<tr><td><p style="margin-left:0;">&nbsp;</p><h1 style="font-size: 20px; font-weight: bold;line-height: 27px;color:#000000; margin:0 0  12px 0;">Dear <strong>spurtCMS Admin</strong>,</h1></td></tr><tr><td><p style="color:#000000;font-size:14px;">A new user has just registered on spurtCMS. Here are the details:</p></td></tr><tr><td><p style="color:#000000;font-size:14px;"><strong>Name : {FirstName}</strong></p><p  style="color:#000000;font-size:14px;"><strong>Email : {Useremail}</strong></p><p  style="color:#000000;font-size:14px;margin:0 0 16px;"><strong>Registration Time : {Timestamp}</strong></p></td></tr><tr><td><p style="color:#000000;font-size:14px;margin:0 0 12px;">Please review the registration details in the admin panel and take any necessary actions.</p></td></tr><tr><td><p style="color:#000000;font-size:16px;line-height:normal;">Best Regards,</p><p style="color:#000000;font-size:16px;font-weight:500;line-height:24px;margin:0 0 16px;"><strong>The spurtCMS Team</strong></p></td></tr>',0,'2024-11-02 14:56:12',1, 0,1,'New User Registration Alert',1)


-- truncate table tbl_assistants
-- truncate table tbl_assistant_user_groups
-- truncate table tbl_assistant_user_group_channels
-- truncate table tbl_assistant_usr_grp_ch_files
-- truncate table tbl_assistant_files

-- truncate table tbl_assistant_models
-- truncate table tbl_assistant_model_details
