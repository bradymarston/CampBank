using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CampBank.Migrations
{
    public partial class SeedAdmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO [AspNetUsers] ([Id], [AccessFailedCount], [ConcurrencyStamp], [Email], [EmailConfirmed], [LockoutEnabled], [LockoutEnd], [NormalizedEmail], [NormalizedUserName], [PasswordHash], [PhoneNumber], [PhoneNumberConfirmed], [SecurityStamp], [TwoFactorEnabled], [UserName]) VALUES ('97310d9b-d639-4ca7-a184-d91446be0713', 0, '7558f76c-f052-4e46-a37f-c0e1a28416df', NULL, 0, 1, NULL, NULL, 'ADMIN', 'AQAAAAEAACcQAAAAENADXzH354zzmy7hbaLH+QY1OdEYHv9sW2qcsoD/0pYpRXPJzPbB8T4mF3ecZBQNhA==', NULL, 0, '5fc5e1f5-23c5-413f-a57f-d375066cee64', 0, 'admin')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [AspNetUsers] WHERE [UserName] = N'admin'");
        }
    }
}
