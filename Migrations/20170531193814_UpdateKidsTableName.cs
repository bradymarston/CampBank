using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CampBank.Migrations
{
    public partial class UpdateKidsTableName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kid");

            migrationBuilder.CreateTable(
                name: "Kids",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CabinId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kids", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kids_Cabins_CabinId",
                        column: x => x.CabinId,
                        principalTable: "Cabins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kids_CabinId",
                table: "Kids",
                column: "CabinId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Kids");

            migrationBuilder.CreateTable(
                name: "Kid",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Balance = table.Column<float>(nullable: false),
                    CabinId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kid", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Kid_Cabins_CabinId",
                        column: x => x.CabinId,
                        principalTable: "Cabins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Kid_CabinId",
                table: "Kid",
                column: "CabinId");
        }
    }
}
