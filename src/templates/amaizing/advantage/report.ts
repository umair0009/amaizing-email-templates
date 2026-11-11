import { data } from "@amaizing-inc/perpendicular-core";
import { Page } from "@amaizing-inc/perpendicular-plugin-web";

@Page("email", {
  overrides: {
    name: "Report",
    slug: "revup-report",
    deps: [
      "../../../components/Button.ts",
      "../../../components/Section.ts",
      "../../../components/AdvHeader.ts",
      "../../../components/Paragraph.ts",
      "../../../components/CTAComponent.ts",
      "../../../components/FooterComponent.ts",
    ],
  },
})
export class Report {
  @data()
  title =
    // biome-ignore lint/suspicious/noTemplateCurlyInString: relates to `mustachio`
    "{{brand}}’s ${{ som }} market analysis: {{ num_rivals }} competitors, {{ key_finding }}";

  @data()
  uuid = "d1493d5b-a9cb-49ec-ab89-8c8cd1cd4bb3";

  @data()
  brand = "Keego’s";

  @data()
  som = "183,606";

  @data()
  key_finding = "badge- & Prime-driven substitution risk";

  @data()
  app_subdomain_suffix = "-stg";

  @data()
  first_name = "Barry";

  @data()
  client_asin_title = "Keego Motorized Skylight Cellular Shades (Blackout)";

  @data()
  client_asin = "B0DG217MG1";

  @data()
  amazon_tld = "com";

  @data()
  has_rivals = true;

  @data()
  num_rivals = 10;

  @data()
  num_top_rivals = 3;

  @data()
  market_analysis_summary = [
    "Despite your 4.4 rating on 95 reviews and $5,874.75/month, you currently rank 8th of 11 by revenue. Your $99.99 price and motorized, skylight-specific positioning create relevance that general window shades can’t match.",
    "However, large review moats, Amazon badges, and Prime fulfillment are nudging shoppers to substitute into broader, lower-priced cellular options while your skylight focus limits addressable demand.",
  ];

  @data()
  competitors = [
    {
      asin: "ABCDEFGHI1",
      rival_title:
        "Blackout Cellular Shades Cordless Blinds Window Shades for ",
      monthly_revenue: "81,544",
      strength_of_rival:
        "2,526 reviews, Amazon’s Choice, and FBA/Prime combine social proof + convenience; at $90.39, they undercut your price and win broader “any-window” demand—driving outsized volume.",
      advantage_over_rival:
        "You hold a higher rating (4.4 vs. 4.2) and a motorized, skylight-specific use case that improves relevance and willingness to pay among skylight shoppers; their generic cellular shade cannot match that fit.",
    },
    {
      asin: "ABCDEFGHI2",
      rival_title: "Motorized Blinds with Remote, 100% Blackout Smart Blinds ",
      monthly_revenue: "44,362",
      strength_of_rival:
        "Polished listing and clear smart-home messaging plus Prime fulfillment lift conversion at a higher $109 price; persuasive bullets reduce friction and reinforce quality.",
      advantage_over_rival:
        "You can present a direct value edge (~$9 lower price) while keeping a 4.4 rating and skylight specificity; pairing this with clearer specs narrows their messaging advantage.",
    },
    {
      asin: "ABCDEFGHI3",
      rival_title: "Zshine Motorized Cellular Shades Cordless Honeycomb Blinds",
      monthly_revenue: "10,850",
      strength_of_rival:
        "Broader variant set and spec-rich bullets make selection easy and reduce returns; at ~$126.96, they still convert due to clarity and perceived quality.",
      advantage_over_rival:
        "Your pricing is ~21% lower ($99.99 vs. ~$126.96) with comparable review level (95 vs. 96), enabling a stronger value story once benefits and installation details are surfaced.",
    },
  ];
}
